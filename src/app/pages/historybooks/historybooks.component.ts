import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminBook, TopBooks, TopClient } from '../../../assets/models/models';
import { DatabookService } from '../../services/forbook/databook.service';
import { LendsbooksComponent } from "./lendsbooks/lendsbooks.component";
import { ReturnsbooksComponent } from "./returnsbooks/returnsbooks.component";
import { LendbookhistoryService } from '../../services/history/lendbookhistory.service';
import { error } from 'console';
import { ReturnbookhistoryService } from '../../services/history/returnbookhistory.service';

@Component({
  selector: 'app-historybooks',
  standalone: true,
  imports: [ReturnsbooksComponent, LendsbooksComponent, ReturnsbooksComponent],
  templateUrl: './historybooks.component.html',
  styleUrl: './historybooks.component.scss'
})
export class HistorybooksComponent {

  books: AdminBook[] = []
  topClient!: TopClient
  topBook: TopBooks[] = []

  shownBookId: number | null = null;
  showLends = false
  //isBookShown = true

  constructor(private bookService: DatabookService, private lendBookService: LendbookhistoryService, private cd: ChangeDetectorRef, private retunrBookService: ReturnbookhistoryService) { }
  ngOnInit() {
    this.bookService.getBooks().subscribe(books => this.books = books)
    this.lendBookService.getMostReadBooksByMonth().subscribe(
      requets => {
        this.topBook = requets
        this.cd.detectChanges()
      }
      , error => {
        console.log('Top libros error')
        console.log(error)}
    )
    this.retunrBookService.getTopClient().subscribe(
      request => {
        console.log(request)
        this.topClient = request
        this.cd.detectChanges
      }
      , error => {
        console.log('Top clientes error')
        console.log(error)
      }
    )
  }

  deployContent(bookId: number) {
    this.shownBookId = this.shownBookId === bookId ? null : bookId;
  }

  isBookShown(bookId: number): boolean {
    return this.shownBookId === bookId;

  }
}