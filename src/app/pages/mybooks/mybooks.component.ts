import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminBook, InsertReturnBook, MyBooks, UserType } from '../../../assets/models/models';
import { DatabookService } from '../../services/forbook/databook.service';
import { MybookserviceService } from '../../services/forbook/mybookservice.service';
import { LoginserviceService } from '../../services/foruser/loginservice.service';
import { error } from 'node:console';
import { ReturnbookhistoryService } from '../../services/history/returnbookhistory.service';
import { formatDate } from '../../../funtions/funtions.format';
import { statesBook } from '../../../assets/data/data';
import { addLendBookSuccess, addReturnBookSuccess, confirmDelete, defaultErrorAlert, saveBook } from '../../../alerts/alerts';
import { LendbookhistoryService } from '../../services/history/lendbookhistory.service';
import { ConectionError, DefaultErrorAngular, ErrorBookIsUsed } from '../../../errors/errors';
import { request } from 'node:http';

@Component({
  selector: 'app-mybooks',
  standalone: true,
  imports: [],
  templateUrl: './mybooks.component.html',
  styleUrl: './mybooks.component.scss'
})
export class MybooksComponent {

  gotBooks: AdminBook[] = []
  reservedBooks: AdminBook[] = []
  allMyBooks: AdminBook[] = []

  myBooks: MyBooks[] = []
  myUser!: UserType;

  constructor(private bookService: DatabookService, private cd: ChangeDetectorRef,
    private myBooksService: MybookserviceService, private loginService: LoginserviceService,
    private returnBookService: ReturnbookhistoryService, private lendBookService: LendbookhistoryService) { }


  ngOnInit() {
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!;
      this.myUser = userLocal.us_id ? userLocal : user;
      this.myBooksService.getMyBooks(this.myUser.us_id!).subscribe((myBooks) => this.myBooks = myBooks)
      this.bookService.getBooksFromMyBooks(this.myUser.us_id!).subscribe({
        next: data => {
          this.allMyBooks = data
          this.filterBooks()
        }
        , error: error => DefaultErrorAngular.emitAlert()
      })

    })

  }

  filterBooks() {
    this.gotBooks = []
    this.reservedBooks = []

    this.allMyBooks.forEach((book) => {
      if (book.boo_state === statesBook[1].description) {
        this.gotBooks.push(book)
      } else {
        this.reservedBooks.push(book)
      }
    })
    this.cd.detectChanges()

  }

  updatAllmyBooks(book: AdminBook) {
    this.allMyBooks = this.allMyBooks.filter((myBook) => myBook.boo_id !== book.boo_id)
  }

  fillDataReturnBook(book: AdminBook) {
    const today = new Date()
    today.setDate(today.getDate())

    const newReturnBook: InsertReturnBook = {
      retboo_idBook: book.boo_id,
      retboo_nameBook: book.boo_name,
      retboo_category: book.boo_category,
      retboo_idUser: this.myUser.us_id,
      retboo_nameUser: this.myUser.us_name,
      retboo_date: `${formatDate(today)}`,
    }

    return newReturnBook
  }

  returnBook(book: AdminBook) {
    const deleteMyBook = this.myBooks.find((mb) => book.boo_id === mb.myBoo_idBook)!
    const newReturnBook = this.fillDataReturnBook(book)
    book.boo_state = statesBook[0].description
    console.log('returnBook')
    console.log(book)

    this.returnBookService.createReturnBook(newReturnBook, book, deleteMyBook.myBoo_id).subscribe({
      next: request => {
        addReturnBookSuccess()
        this.updatAllmyBooks(book)
        this.filterBooks()
        this.cd.detectChanges()
      }
      , error: (err) => console.log(err)
    })
  }

  getMyBookReserved(book: AdminBook) {
    if (book.boo_state !== statesBook[1].description) {
      book.boo_state = statesBook[1].description
      this.bookService.updateBook(book).subscribe(
        request => {
          const myBookUpdate: MyBooks = this.myBooks.find((myBook) => book.boo_id === myBook.myBoo_idBook)!
          try {
            const limitDay = +myBookUpdate.myBoo_limit_date!
            if (isNaN(limitDay)) throw new DefaultErrorAngular('Error, ya se ha realizado un ajuste anteriormente')

            const currentDate = new Date();
            const today = new Date()

            myBookUpdate.myBoo_inicial_date = `${formatDate(today)}`

            currentDate.setDate(currentDate.getDate() + limitDay)
            myBookUpdate.myBoo_limit_date = `${formatDate(currentDate)}`            

            this.lendBookService.getLendBookByIdBook(book.boo_id!, this.myUser.us_id).subscribe(
              lendBookUpdate => {
                lendBookUpdate.lenboo_inicial_date = myBookUpdate.myBoo_inicial_date
                lendBookUpdate.lenboo_limit_date = myBookUpdate.myBoo_limit_date


                this.lendBookService.updateLendBook(lendBookUpdate).subscribe({
                  next: () => this.myBooksService.upDateMyBook(myBookUpdate).subscribe({
                    next: () => {
                      addLendBookSuccess()
                      this.cd.detectChanges()                      
                      this.filterBooks()
                    }
                  })
                  , error: (error) => console.error(error)
                })
              }, error => { console.error(error) }
            )

          } catch (err) {
            if (err instanceof DefaultErrorAngular) DefaultErrorAngular.emitAlert()
          }
          this.cd.detectChanges()
        }
        , error => console.log(error)

      )


    } else {
      ErrorBookIsUsed.emitAlert()
    }

  }

  async cancelReservation(book: AdminBook) {
    const deleteMyBook = this.myBooks.find((mb) => book.boo_id === mb.myBoo_idBook)!
    const isConfirmed = await confirmDelete(book)
    if (isConfirmed) {
      this.myBooksService.deleteMyBook(deleteMyBook.myBoo_id!).subscribe(
        request => {
          this.lendBookService.getLendBookByIdBook(book.boo_id!, this.myUser.us_id).subscribe(
            request => {
              this.lendBookService.deleteLendBook(request.lenboo_id).subscribe(
                request => {
                  book.boo_state = statesBook[0].description
                  this.bookService.updateBook(book).subscribe({
                    next: request => this.cd.detectChanges()
                    , error: error => console.error(error)
                  })
                  this.updatAllmyBooks(book)
                  this.filterBooks()
                  this.cd.detectChanges()
                }
                , error => { ConectionError.emitAlert('error al actualizar los prestamos, intentelo más tarde') }
              )
            }, error => { ConectionError.emitAlert('error al buscar el libro, intento más tarde') }
          )
          this.cd.detectChanges()
        }, error => ConectionError.emitAlert('Error al actualizar mis libros prestados, intentelo más tarde')
      )
    }
  }
}