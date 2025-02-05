import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AdminBook, ReturnBookHistory } from '../../../../assets/models/models';
import { ReturnbookhistoryService } from '../../../services/history/returnbookhistory.service';
import { error } from 'console';

@Component({
  selector: 'app-returnsbooks',
  standalone: true,
  imports: [],
  templateUrl: './returnsbooks.component.html',
  styleUrl: './returnsbooks.component.scss'
})
export class ReturnsbooksComponent {

  @Input({ required: true }) book!: AdminBook;
  returnsBooks: ReturnBookHistory[] = [];

  constructor(private returnBookSerive: ReturnbookhistoryService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.returnBookSerive.getReturnBooks().subscribe({
      next: data => {
        this.returnsBooks = data.filter((rbook) => this.book.boo_id === rbook.retboo_idBook)
        this.cd.detectChanges()
      }, error: error => {

      }
    })
  }

}