import { Component } from '@angular/core';
import { AdminBook } from '../../../assets/models/models';
import { DatabookService } from '../../services/forbook/databook.service';
import { LendsbooksComponent } from "./lendsbooks/lendsbooks.component";
import { ReturnsbooksComponent } from "./returnsbooks/returnsbooks.component";

@Component({
  selector: 'app-historybooks',
  standalone: true,
  imports: [ReturnsbooksComponent, LendsbooksComponent, ReturnsbooksComponent],
  templateUrl: './historybooks.component.html',
  styleUrl: './historybooks.component.scss'
})
export class HistorybooksComponent {

  books: AdminBook[] = []
  shownBookId: number | null = null;
  showLends = false
  //isBookShown = true

  constructor(private bookService: DatabookService) { }
  ngOnInit() {
    this.bookService.getBooks().subscribe(books => this.books = books)
  }

  deployContent(bookId: number) {
    this.shownBookId = this.shownBookId === bookId ? null : bookId;   
  }

  isBookShown(bookId: number): boolean {
    return this.shownBookId === bookId;

  }
}
