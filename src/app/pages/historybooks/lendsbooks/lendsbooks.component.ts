import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AdminBook, LendBookHistory } from '../../../../assets/models/models';
import { LendbookhistoryService } from '../../../services/history/lendbookhistory.service';
import { error } from 'console';

@Component({
  selector: 'app-lendsbooks',
  standalone: true,
  imports: [],
  templateUrl: './lendsbooks.component.html',
  styleUrl: './lendsbooks.component.scss'
})
export class LendsbooksComponent {
  @Input({ required: true }) book!: AdminBook;

  lendsBooks: LendBookHistory[] = []

  constructor(private lendBookService: LendbookhistoryService, private cd: ChangeDetectorRef) { }

  ngOnInit() {

    this.lendBookService.getLendBooks().subscribe(
      data => {
        this.lendsBooks = data.filter((lend) => this.book.boo_name === lend.lenboo_nameBook)
        this.cd.detectChanges()
      }
    )
  }
}