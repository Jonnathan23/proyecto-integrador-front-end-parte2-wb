import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { categories } from '../../../../../assets/data/categorias';
import { AdminBook } from '../../../../../assets/models/models';
import { errorInputs } from '../../../../../alerts/alerts';

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
    id: 0,
    name: '',
    description: '',
    image: '',
    autor: '',
    category: ""
  }

  constructor(private render: Renderer2) {
    //this.cbText = selectedBookService.getCbText()
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
    this.book.category = category.value
  }

  /**
   * @description Obtiene la informacion de todos los campos del formulario
   */
  getAllContInputs() {
    this.book.name = this.txtName.nativeElement.value
    this.book.autor = this.txtAutor.nativeElement.value
    this.book.description = this.txtDescription.nativeElement.value
    this.book.category = this.cbCategory.nativeElement.value
    this.book.image = this.imgBook.nativeElement.src
  }

  /**
   * @description Llena los datos del formulario con el libro que se la ha pasado como parametro
   * @param book 
   */
  fillData(book: AdminBook) {
    this.render.setProperty(this.txtName.nativeElement, 'value', book.name)
    this.render.setProperty(this.txtAutor.nativeElement, 'value', book.autor)
    this.render.setProperty(this.txtDescription.nativeElement, 'value', book.description)
    this.render.setProperty(this.cbCategory.nativeElement, 'value', book.category)
    this.render.setProperty(this.imgBook.nativeElement, 'src', book.image)
  }

  /**
   * @description Reinicia los campos del formulario
   */
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
    if (!this.book.name) return false

    if (!this.book.autor) return false

    if (!this.book.description) return false

    if (this.book.category === this.cbText) return false

    if (this.isAddingBook) if (!this.imgIsSelected) return false

    return true
  }

  /**
   * TODO: falta el 'bookService'
   * @description Guarda la información del libro a nuestra BD
   */
  saveBook() {
    this.getAllContInputs()
    const isValidate = this.checkInputs()
    if (isValidate) {

      this.clearInputs()
    } else {
      errorInputs()

    }
  }

  /**
   * TODO: falta el 'bookService'
   * @description Actualiza la información del libro a nuestra BD
   */
  updateBook() {
    this.getAllContInputs()
    const isValidate = this.checkInputs()

  }
}
