import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminBook, BookType } from '../../../../assets/models/models';
import { DatabookService } from '../../../services/forbook/databook.service';
import { SelectedbookService } from '../../../services/forbook/selectedbook.service';
import { AsidebookComponent } from "./asidebook/asidebook.component";
import { Subject, takeUntil } from 'rxjs';
import { DefaultErrorAngular } from '../../../../errors/errors';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsidebookComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  private destroy$ = new Subject<void>();
  books: AdminBook[] = [];
  isLendingBook = false;

  constructor(private bookService: DatabookService,private selectedBookService:SelectedbookService ,private cd: ChangeDetectorRef) { }

  setAsideBook(book:AdminBook){
    this.isLendingBook = true;
    this.selectedBookService.setSelectedBook(book)
  }

  hideAsideBook(){
    this.isLendingBook = false
  }

  ngOnInit() {
    //this.bookService.getBooks().subscribe((books) => this.books = books)
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

  getBooks(){
    this.bookService.getBooks().subscribe(
      data => {        
        this.books = data
        this.cd.detectChanges()
      },
      error => {
        this.books = []
        console.error(error)
      }
    ) 
  }
}