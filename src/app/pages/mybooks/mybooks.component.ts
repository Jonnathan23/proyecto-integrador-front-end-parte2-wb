import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminBook, InsertReturnBook, MyBooks, UserType } from '../../../assets/models/models';
import { DatabookService } from '../../services/forbook/databook.service';
import { MybookserviceService } from '../../services/forbook/mybookservice.service';
import { LoginserviceService } from '../../services/foruser/loginservice.service';
import { error } from 'node:console';
import { ReturnbookhistoryService } from '../../services/history/returnbookhistory.service';
import { formatDate } from '../../../funtions/funtions.format';
import { statesBook } from '../../../assets/data/data';
import { addLendBookError, addReturnBookSuccess, confirmDelete, saveBook } from '../../../alerts/alerts';
import { LendbookhistoryService } from '../../services/history/lendbookhistory.service';

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

  myBooks: MyBooks[] = []
  myUser!: UserType;

  constructor(private bookService: DatabookService, private cd: ChangeDetectorRef,
    private myBooksService: MybookserviceService, private loginService: LoginserviceService,
    private returnBookService: ReturnbookhistoryService, private lendBookService: LendbookhistoryService) { }
  /**
   * TODO: Cambiar el book service, solo se usa para mostar los libros
   *  * Crear una consulta Sql para obtener en el Back-end para mostrar 'My Books'
   *  *  
   */
  ngOnInit() {
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!;
      this.myUser = userLocal.us_id ? userLocal : user;
      this.myBooksService.getMyBooks(this.myUser.us_id!).subscribe((myBooks) => this.myBooks = myBooks)

      this.bookService.getBooksFromMyBooks(this.myUser.us_id!).subscribe(
        data => {
          data.forEach((book) => {
            if (book.boo_state === statesBook[1].description) {
              this.gotBooks.push(book)
            } else {
              this.reservedBooks.push(book)
            }
          })
          this.cd.detectChanges()
        }
        , error => { }
      )
    })

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

    this.returnBookService.createReturnBook(newReturnBook, book, deleteMyBook.myBoo_id).subscribe(
      request => {
        addReturnBookSuccess()
        this.cd.detectChanges()
      }
      , (err) => console.log(err)
    )
  }

  getMyBookReserved(book: AdminBook) {
    if (book.boo_state === statesBook[0].description) {

    } else {
      addLendBookError()
    }

  }

  async cancelReservation(book: AdminBook) {
    const deleteMyBook = this.myBooks.find((mb) => book.boo_id === mb.myBoo_idBook)!
    const isConfirmed = await confirmDelete(book)
    if (isConfirmed) {
      this.returnBookService.deleteReturnBook(deleteMyBook.myBoo_id)
    }

  }
}