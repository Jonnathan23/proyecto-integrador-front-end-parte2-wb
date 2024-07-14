import { Component } from '@angular/core';
import { AdminBook } from '../../../../assets/models/models';
import { confirmDelete } from '../../../../alerts/alerts';
import { AddbookComponent } from "./addbook/addbook.component";
import { booksData } from '../../../../assets/data/books';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AddbookComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  books: AdminBook[] = [];

  adminLibrary = true

  ngOnInit(){
    this.books = [...booksData]
  }

  /**
   * TODO: Falta el servicio de 'selectedBookService'
   */
  showAdminLibrary() {
    this.adminLibrary = true;
    
  }
  
  hideAdminLibrary() {
    this.adminLibrary = false
  }

   /**
    * TODO: Falta el servicio de 'selectedBookService'
   * @description Envia la informacion del libro seleccionado al componente AddBookComponent
   * por un servicio
   * @param book 
   */
   modifyBook(book: AdminBook) {
    this.adminLibrary = true   

  }
/**
 * TODO: falta el servicio 'bookService'
 * @param bookDelete 
 */
  async delete(bookDelete: AdminBook) {
    const isConfirmed = await confirmDelete(bookDelete)    

    
  }


}
