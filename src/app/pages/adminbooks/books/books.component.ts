import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminBook, BookType } from '../../../../assets/models/models';
import { DatabookService } from '../../../services/forbook/databook.service';
import { SelectedbookService } from '../../../services/forbook/selectedbook.service';
import { AsidebookComponent } from "./asidebook/asidebook.component";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsidebookComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
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
