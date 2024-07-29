import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { categories } from '../../../../../assets/data/data';
import { AdminBook, BookType } from '../../../../../assets/models/models';
import { errorInputs, errorModifyBook, errorSave, modifyBook, saveBook } from '../../../../../alerts/alerts';
import { SelectedbookService } from '../../../../services/forbook/selectedbook.service';
import { DatabookService } from '../../../../services/forbook/databook.service';

@Component({
  selector: 'app-addbook',
  standalone: true,
  imports: [],
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.scss'
})
export class AddbookComponent {
  // Determina si se agrega o se modifica
  isAddingBook = true

  ourCategories = [...categories]

  // Verificador de la selección de img
  imgIsSelected = false
  cbText!: string;
  defaultImage = 'assets/img/selectImage.jpg'

  //Seleccionar elementos del doom
  @ViewChild('name') txtName!: ElementRef;
  @ViewChild('autor') txtAutor!: ElementRef;
  @ViewChild('description') txtDescription!: ElementRef;
  @ViewChild('cbCategory') cbCategory!: ElementRef;
  @ViewChild('book_img') imgBook!: ElementRef;

  //Inicializacion del objeto
  book: AdminBook = {
    boo_id: 0,
    boo_name: '',
    boo_description: '',
    boo_image: '',
    boo_autor: '',
    boo_category: ""
  }

  constructor(private render: Renderer2, private selectedBookService: SelectedbookService, private bookService: DatabookService) {
    this.cbText = selectedBookService.getCbText()
  }

  ngOnInit() {
    this.selectedBookService.getSelectedBook().subscribe((book) => {
      this.book = book
      this.isAddingBook = !this.book.boo_id ? true : false
      setTimeout(() => this.fillData(this.book), 0)
    })
  }


  /**
  * @description convierte la imagen seleccionada en formato URL
  * @param e Evento del mismo componente
  * @param img 
  */
  selectImg(e: Event, img: HTMLImageElement) {
    const input = e.target as HTMLInputElement

    //Verifica si se ha seleccionado la imagen
    if (input.files?.[0]) {
      const reader = new FileReader()
      reader.onload = () => img.src = reader.result as string
      reader.readAsDataURL(input.files[0])
      this.imgIsSelected = true

    } else {
      img.src = this.defaultImage
      this.imgIsSelected = false
    }
  }


  selectCategory(e: Event) {
    const category = e.target as HTMLInputElement
    this.book.boo_category = category.value
  }

  /** @description Obtiene la informacion de todos los campos del formulario  */
  getAllContInputs() {
    this.book.boo_name = this.txtName.nativeElement.value
    this.book.boo_autor = this.txtAutor.nativeElement.value
    this.book.boo_description = this.txtDescription.nativeElement.value
    this.book.boo_category = this.cbCategory.nativeElement.value
    this.book.boo_image = this.imgBook.nativeElement.src
  }

  /**
   * @description Llena los datos del formulario con el libro que se la ha pasado como parametro
   * @param book 
   */
  fillData(book: AdminBook) {
    this.render.setProperty(this.txtName.nativeElement, 'value', book.boo_name)
    this.render.setProperty(this.txtAutor.nativeElement, 'value', book.boo_autor)
    this.render.setProperty(this.txtDescription.nativeElement, 'value', book.boo_description)
    this.render.setProperty(this.cbCategory.nativeElement, 'value', book.boo_category)
    this.render.setProperty(this.imgBook.nativeElement, 'src', book.boo_image)
  }

  /** @description Reinicia los campos del formulario */
  clearInputs() {
    this.defaultImage = 'assets/img/selectImage.jpg'
    this.render.setProperty(this.txtName.nativeElement, 'value', "")
    this.render.setProperty(this.txtAutor.nativeElement, 'value', "")
    this.render.setProperty(this.txtDescription.nativeElement, 'value', "")
    this.render.setProperty(this.cbCategory.nativeElement, 'value', this.cbText)
    this.render.setProperty(this.imgBook.nativeElement, 'src', this.defaultImage)
  }

  /**
   * @description Verifica que todos los campos del formulario hayan sido llenados
   * @returns boolean
   */
  checkInputs(): boolean {
    if (!this.book.boo_name) return false

    if (!this.book.boo_autor) return false

    if (!this.book.boo_description) return false

    if (this.book.boo_category === this.cbText) return false

    if (this.isAddingBook) if (!this.imgIsSelected) return false

    return true
  }

  /** @description Guarda la información del libro a nuestra BD */
  saveBook() {
    this.getAllContInputs()
    const isValidate = this.checkInputs()

    if (isValidate) {
      const newBook = this.book as BookType
      console.log()
      this.bookService.createBook(newBook).subscribe(
         () => {
          saveBook()
          this.clearInputs()
        }
        , error  => {
          console.log(this.book)
          console.log(error)
          errorSave()
        }
      )

    } else {
      errorInputs()

    }
  }

  /** @description Actualiza la información del libro a nuestra BD */
  updateBook() {
    this.getAllContInputs()
    const isValidate = this.checkInputs()

    if (isValidate) {
      this.bookService.updateBook(this.book).subscribe({
        next: () => modifyBook()
        ,error: () => errorModifyBook()
      })        
    }

  }
}