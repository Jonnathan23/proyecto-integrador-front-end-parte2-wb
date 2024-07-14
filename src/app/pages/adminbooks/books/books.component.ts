import { Component } from '@angular/core';
import { BookType } from '../../../../assets/models/models';
import { booksData } from '../../../../assets/data/books';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  books: BookType[] = [];

  ngOnInit(){
    this.books = [...booksData]
  }
}
