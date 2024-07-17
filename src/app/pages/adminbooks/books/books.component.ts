import { Component } from '@angular/core';
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

  constructor(private bookService: DatabookService) { }
  ngOnInit() {
    //this.bookService.getBooks().subscribe((books) => this.books = books)
    this.bookService.getBooks().subscribe({
      next: (books) => this.books = books
      ,error: () => this.books = []
    })
  }
}
