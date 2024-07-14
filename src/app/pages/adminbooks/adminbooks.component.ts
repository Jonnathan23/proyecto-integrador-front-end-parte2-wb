import { Component } from '@angular/core';
import { UserType } from '../../../assets/models/models';
import { AdminComponent } from "./admin/admin.component";
import { BooksComponent } from "./books/books.component";

@Component({
  selector: 'app-adminbooks',
  standalone: true,
  imports: [AdminComponent, BooksComponent],
  templateUrl: './adminbooks.component.html',
  styleUrl: './adminbooks.component.scss'
})
export class AdminbooksComponent {
  

}
