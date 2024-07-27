import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AdminBook, LendBookHistory, StateBook } from '../../../../../assets/models/models';
import { DatabookService } from '../../../../services/forbook/databook.service';
import { SelectedbookService } from '../../../../services/forbook/selectedbook.service';
import { addLendBookError, errorInputs } from '../../../../../alerts/alerts';
import { dates, statesBook } from '../../../../../assets/data/data';
import { LoginserviceService } from '../../../../services/foruser/loginservice.service';
import { LendbookhistoryService } from '../../../../services/history/lendbookhistory.service';
import { ErrorFillEmpty, ErrorBookIsReserved } from '../../../../../errors/errors';

@Component({
  selector: 'app-asidebook',
  standalone: true,
  imports: [],
  templateUrl: './asidebook.component.html',
  styleUrl: './asidebook.component.scss'
})
export class AsidebookComponent {

  cbText!: string
  book!: AdminBook;
  cbDate!: string;
  datesLend = [...dates]
  states: StateBook[] = [...statesBook]
  lendBook: LendBookHistory;

  @ViewChild('name') txtName!: ElementRef;
  @ViewChild('autor') txtAutor!: ElementRef;
  @ViewChild('description') txtDescription!: ElementRef;
  @ViewChild('cbCategory') cbCategory!: ElementRef;
  @ViewChild('book_img') imgBook!: ElementRef;

  constructor(private selectedBookService: SelectedbookService, private render: Renderer2, private lendBookService: LendbookhistoryService, private loginService: LoginserviceService) {
    this.cbText = this.selectedBookService.getCbText();
    this.cbDate = this.selectedBookService.getCbDate();
    this.lendBook = this.lendBookService.getLendBookRestar()
  }

  ngOnInit() {
    this.selectedBookService.getSelectedBook().subscribe((book) => {
      this.book = book
      this.loginService.getUserActive().subscribe((user) => {
        const userLocal = this.loginService.getUserStorage()!;

        if (userLocal.us_id) {
          this.lendBook.lenboo_nameUser = userLocal.us_name
          this.lendBook.lenboo_idUser = userLocal.us_id
        } else {
          this.lendBook.lenboo_nameUser = user.us_name
          this.lendBook.lenboo_idUser = user.us_id!
        }

        //! Eliminar estas dos lineas
        this.lendBook.lenboo_idUser = this.loginService.getDefaultUser().us_id
        this.lendBook.lenboo_nameUser = this.loginService.getDefaultUser().us_name
      })

      this.setLendBookData()

      setTimeout(() => this.fillData(this.book), 0)
    })
  }

  /**
   * @description Llena los datos del formulario con el libro que se la ha pasado como parametro
   * @param book 
   */
  fillData(book: AdminBook) {
    this.render.setProperty(this.txtName.nativeElement, 'value', book.boo_name)
    this.render.setProperty(this.txtAutor.nativeElement, 'value', book.boo_autor)
    this.render.setProperty(this.txtDescription.nativeElement, 'value', book.boo_description)
    this.cbText = book.boo_category!
    this.render.setProperty(this.imgBook.nativeElement, 'src', book.boo_image)
  }

  selectDate(e: Event) {
    const date = e.target as HTMLInputElement
    const currentDate = new Date();
    const today = new Date()
    this.lendBook.lenboo_inicial_date = `${today}`
    this.lendBook.lenboo_limit_date = `${currentDate.setDate(currentDate.getDate() + dates[+date.value - 1].days)}`
  }

  setLendBookData() {
    this.lendBook.lenboo_idBook = this.book.boo_id
    this.lendBook.lenboo_category = this.book.boo_category
    this.lendBook.lenboo_nameBook = this.book.boo_name
  }

  async check() {
    if (this.lendBook.lenboo_inicial_date === '') throw new ErrorFillEmpty('Fecha no seleccionada')
    else if (this.lendBook.lenboo_limit_date === '') throw new ErrorFillEmpty('Fecha no seleccionada')

    if (this.book.boo_state !== statesBook[0].description) throw new ErrorBookIsReserved('Libro reservado')

  }

  async saveMyBook() {
    try {
      await this.check()
      this.book.boo_state = statesBook[1].description
      this.lendBookService.addLendBook(this.lendBook, this.book)

    } catch (error) {

      if (error instanceof ErrorFillEmpty) errorInputs()

      else if (error instanceof ErrorBookIsReserved) addLendBookError()

      else addLendBookError()
    }
  }

  async aside() {
    try {
      await this.check()
      this.book.boo_state = statesBook[1].description
      this.lendBookService.addLendBook(this.lendBook, this.book)
    } catch (error) {

    }
  }
}
