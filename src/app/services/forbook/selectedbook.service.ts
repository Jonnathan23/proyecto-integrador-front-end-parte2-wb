import { Injectable } from '@angular/core';
import { AdminBook } from '../../../assets/models/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedbookService {
  private cbText = 'Seleccione Categoria';
  private srcImageNotFound = 'assets/img/selectImage.jpg'

  private restarBook: AdminBook = { boo_id: 0, boo_name: '', boo_description: '', boo_image: this.srcImageNotFound, boo_autor: '', boo_category: this.cbText }
  private selectedBook = new BehaviorSubject<AdminBook>(this.restarBook);
  selectedBook$: Observable<AdminBook> = this.selectedBook.asObservable();
  constructor() { }

  /** 
 * 
 * @description setea el libro en el observable de este servicio
 * @param book 
 */
  setSelectedBook(book: AdminBook) {
    this.selectedBook.next(book);
  }

  /**
   * @description reinicia el valor del libro en el observable
   */
  resetBook() {
    this.selectedBook.next(this.restarBook);
  }

  getRestarBook() {
    return this.restarBook;
  }

  getImgNotFound() {
    return this.srcImageNotFound;
  }

  getCbText() {
    return this.cbText;
  }

  /**
   * 
   * @returns selectedBook$ --> libro que se encuentra actualmente
   */
  getSelectedBook() {
    return this.selectedBook$
  }
}
