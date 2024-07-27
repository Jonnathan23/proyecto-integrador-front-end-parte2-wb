import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminBook, UserType } from '../../../assets/models/models';
import { DatabookService } from '../../services/forbook/databook.service';
import { MybookserviceService } from '../../services/forbook/mybookservice.service';
import { LoginserviceService } from '../../services/foruser/loginservice.service';
import { error } from 'node:console';

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

  constructor(private bookService: DatabookService, private cd: ChangeDetectorRef, private myBooksService: MybookserviceService, private loginService: LoginserviceService) { }
  /**
   * TODO: Cambiar el book service, solo se usa para mostar los libros
   *  * Crear una consulta Sql para obtener en el Back-end para mostrar 'My Books'
   *  *  
   */
  ngOnInit() {
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!;
      this.myUser = userLocal.us_id ? userLocal : user;

      this.bookService.getBooksFromMyBooks(this.myUser.us_id!).subscribe(
        data => this.books = data
        , error => { }
      )
    })
  }

  returnBook(book: AdminBook) {

  }
}