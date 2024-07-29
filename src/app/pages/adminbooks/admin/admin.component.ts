import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminBook } from '../../../../assets/models/models';
import { confirmDelete, deleteSuccess, errorDelete } from '../../../../alerts/alerts';
import { AddbookComponent } from "./addbook/addbook.component";
import { SelectedbookService } from '../../../services/forbook/selectedbook.service';
import { DatabookService } from '../../../services/forbook/databook.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DefaultErrorAngular } from '../../../../errors/errors';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AddbookComponent, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  private destroy$ = new Subject<void>();
  books: AdminBook[] = [];

  adminLibrary = true

  constructor(private selectedBookService: SelectedbookService, private bookService: DatabookService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getBooks()
  }

  /** @description cancela la suscripcion */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * @description funcion del buscador
   * @param event 
   */
  onSearch(data: string) {
    if (data) {
      this.bookService.searchNameBooks(data).pipe(takeUntil(this.destroy$)).subscribe({
        next: (booksName) => booksName.length ? this.books = booksName : this.searchCategory(data)
        , error: error => DefaultErrorAngular.emitAlert()
      })
    } else {
      this.getBooks()
    }

  }

  /**
   * @description busca los libros por categoria
   * @param data 
   */
  searchCategory(data: string) {
    this.bookService.searchCategoryBooks(data).pipe(takeUntil(this.destroy$)).subscribe({
      next: booksCategory => booksCategory.length ? this.books = booksCategory : this.searchAutor(data)
      , error: () => DefaultErrorAngular.emitAlert()
    })
  }

  /**
   * @description busca los libros por el nombre del autor
   * @param data 
   */
  searchAutor(data: string) {
    this.bookService.searchAutorBooks(data).pipe(takeUntil(this.destroy$)).subscribe({
      next: booksAutor => booksAutor.length ? this.books = booksAutor : this.searchAvailability(data)
      , error: () => DefaultErrorAngular.emitAlert()
    })
  }

  /**
   * @description busca los libros por el nombre
   * @param data 
   */
  searchAvailability(data: string) {
    this.bookService.searchAvailabilityBooks(data).pipe(takeUntil(this.destroy$)).subscribe({
      next: booksAvailability => this.books = booksAvailability.length ? booksAvailability : []
      , error: () => DefaultErrorAngular.emitAlert()
    })
  }

  getBooks() {
    this.bookService.getBooks().pipe(takeUntil(this.destroy$)).subscribe({
      next: data => {
        this.books = data
        this.cd.detectChanges()
      }, error: () => {
        this.books = []
        DefaultErrorAngular.emitAlert()
      }
    })
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
      this.bookService.deleteBook(bookDelete.boo_id!).subscribe({
        next: () => deleteSuccess()
        , error: () => errorDelete()
      })
    }
  }


}