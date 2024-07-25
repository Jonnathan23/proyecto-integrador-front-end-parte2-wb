import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminBook, UserType } from '../../../assets/models/models';
import { DatabookService } from '../../services/forbook/databook.service';
import { MybookserviceService } from '../../services/forbook/mybookservice.service';

@Component({
  selector: 'app-mybooks',
  standalone: true,
  imports: [],
  templateUrl: './mybooks.component.html',
  styleUrl: './mybooks.component.scss'
})
export class MybooksComponent {

  books: AdminBook[] = []
  myUser!: UserType;

  constructor(private bookService: DatabookService, private cd: ChangeDetectorRef, private myBooksService: MybookserviceService) { }
/**
 * TODO: Cambiar el book service, solo se usa para mostar los libros
 *  * Crear una consulta Sql para obtener en el Back-end para mostrar 'My Books'
 *  *  
 */
  ngOnInit() {
    this.bookService.getBooks().subscribe(
      data => {
        this.books = data
        this.cd.detectChanges()
      }
    )
  }
  returnBook(book: AdminBook) {

  }
}