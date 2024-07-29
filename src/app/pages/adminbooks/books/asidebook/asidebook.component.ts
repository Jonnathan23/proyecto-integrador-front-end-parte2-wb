import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AdminBook, LendBookHistory, StateBook } from '../../../../../assets/models/models';
import { SelectedbookService } from '../../../../services/forbook/selectedbook.service';
import { dates, statesBook } from '../../../../../assets/data/data';
import { LoginserviceService } from '../../../../services/foruser/loginservice.service';
import { LendbookhistoryService } from '../../../../services/history/lendbookhistory.service';
import { ErrorFillEmpty, ErrorBookIsUsed, DefaultErrorAngular } from '../../../../../errors/errors';
import { formatDate } from '../../../../../funtions/funtions.format';

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
  @ViewChild('cbDates') cbDateSelect!: ElementRef;
  @ViewChild('book_img') imgBook!: ElementRef;

  constructor(private selectedBookService: SelectedbookService, private render: Renderer2, private lendBookService: LendbookhistoryService, private loginService: LoginserviceService, private cd: ChangeDetectorRef) {
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
    this.lendBook.lenboo_inicial_date = `${formatDate(today)}`
    currentDate.setDate(currentDate.getDate() + dates[+date.value - 1].days)
    this.lendBook.lenboo_limit_date = `${formatDate(currentDate)}`
  }

  setLendBookData() {
    this.lendBook.lenboo_idBook = this.book.boo_id
    this.lendBook.lenboo_category = this.book.boo_category
    this.lendBook.lenboo_nameBook = this.book.boo_name
  }

  async check() {
    if (this.lendBook.lenboo_inicial_date === '') throw new ErrorFillEmpty('Fecha no seleccionada')
    else if (this.lendBook.lenboo_limit_date === '') throw new ErrorFillEmpty('Fecha no seleccionada')

    if (this.book.boo_state === statesBook[1].description) throw new ErrorBookIsUsed('Libro reservado')

  }

/** @description Obtiene la fecha actual y el plazo del libro */
  getDate() {

    const date = this.cbDateSelect.nativeElement.value
    if (date === this.cbDate) throw new ErrorFillEmpty('Fecha no seleccionada')

    const currentDate = new Date();
    const today = new Date()
    this.lendBook.lenboo_inicial_date = `${formatDate(today)}`
    currentDate.setDate(currentDate.getDate() + dates[date - 1].days)
    this.lendBook.lenboo_limit_date = `${formatDate(currentDate)}`
  }

  /** @description Obtiene el numero de días que tiene disponible de lectura */
  getNumDays() {
    const date = this.cbDateSelect.nativeElement.value
    if (date === this.cbDate) throw new ErrorFillEmpty('Fecha no seleccionada')

    this.lendBook.lenboo_inicial_date = '0'
    this.lendBook.lenboo_limit_date = `${dates[date - 1].days}`
  }


  async saveMyBook() {
    try {
      this.getDate()
      await this.check()
      this.book.boo_state = statesBook[1].description
      console.log(this.lendBook)

      this.lendBookService.addLendBook(this.lendBook, this.book).subscribe({
        next: () => {
          console.log('Guardado exitosamente')
          this.cd.detectChanges()
        }
        , error: (err) => console.error(err)
      })

    } catch (error) {
      this.handleError(error)
    }
  }

  async aside() {
    try {
      this.getNumDays()
      await this.check()

      this.book.boo_state = statesBook[2].description
      this.lendBookService.addLendBook(this.lendBook, this.book).subscribe({
        next: () => {
          console.log('Guardado exitosamente')
          this.cd.detectChanges()
        }
        , error: (err) => console.error(err)
      })
    } catch (error) {
      this.handleError(error)
    }
  }



  handleError(error: unknown) {
    if (error instanceof ErrorFillEmpty) ErrorFillEmpty.emitAlert()

    else if (error instanceof ErrorBookIsUsed) ErrorBookIsUsed.emitAlert()

    else {
      DefaultErrorAngular.emitAlert()
    }
  }
}