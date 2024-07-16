import { Component } from '@angular/core';
import { AdminBook } from '../../../../assets/models/models';
import { confirmDelete, deleteSuccess, errorDelete } from '../../../../alerts/alerts';
import { AddbookComponent } from "./addbook/addbook.component";
import { SelectedbookService } from '../../../services/forbook/selectedbook.service';
import { DatabookService } from '../../../services/forbook/databook.service';

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

  constructor(private selectedBookService: SelectedbookService, private bookService: DatabookService) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => this.books = books)
  }

  /**
   * @description habilita al componente AddBook
   */
  showAdminLibrary() {
    this.adminLibrary = true;
    this.selectedBookService.resetBook()

  }

  hideAdminLibrary() {
    this.adminLibrary = false
  }

  /**    
  * @description Envia la informacion del libro seleccionado al componente AddBookComponent
  * por un servicio
  * @param book 
  */
  modifyBook(book: AdminBook) {
    this.adminLibrary = true
    this.selectedBookService.setSelectedBook(book)
  }
  /**   
   * @param bookDelete 
   */
  async delete(bookDelete: AdminBook) {
    const isConfirmed = await confirmDelete(bookDelete)
    if (isConfirmed) {
      this.bookService.deleteBook(bookDelete.id)
        .then(() => deleteSuccess())
        .catch(() => errorDelete())
    }
  }


}
