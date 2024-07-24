import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminBook, BookType } from '../../../../assets/models/models';
import { DatabookService } from '../../../services/forbook/databook.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  books: AdminBook[] = [];

  constructor(private bookService: DatabookService, private cd: ChangeDetectorRef) { }
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
        console.error(error)
      }
    ) 
  }
}
