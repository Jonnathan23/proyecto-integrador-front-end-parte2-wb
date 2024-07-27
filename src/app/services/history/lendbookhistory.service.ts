import { Injectable } from '@angular/core';
import { DatabookService } from '../forbook/databook.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminBook, InsertLend, InsertMyBooks, LendBookHistory, MyBooks } from '../../../assets/models/models';
import { errorSave } from '../../../alerts/alerts';
import { MybookserviceService } from '../forbook/mybookservice.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LendbookhistoryService {

  private lendBookRestar: LendBookHistory = { lenboo_id: 0, lenboo_category: '', lenboo_idBook: 0, lenboo_nameBook: '', lenboo_idUser: 0, lenboo_nameUser: '', lenboo_inicial_date: '', lenboo_limit_date: '' }
  private url = 'http://localhost:8080/proyectobackend/bl-sv'

  constructor(private bookService: DatabookService, private http: HttpClient, private myBookService: MybookserviceService) { }

  getLendBooks() {
    return this.http.get<LendBookHistory[]>(`${this.url}/lendbooks`)
  }

  getLendBookRestar() {
    return this.lendBookRestar;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  fillDataMyBook(lendBook: LendBookHistory, book: AdminBook) {
    const myBook: MyBooks = {
      myBoo_idUser: lendBook.lenboo_idUser,
      myBoo_nameUser: lendBook.lenboo_nameUser,
      myBoo_idBook: book.boo_id,
      myBoo_nameBook: book.boo_name,
      myBoo_stateBook: book.boo_state
    }
    return myBook
  }

/**
 * ! Da problemas de BAD Request al crear un prestamo
 *  * Funciona el myBook
 * @param lendBook 
 * @param book 
 * @returns 
 */
  addLendBook(lendBook: LendBookHistory, book: AdminBook) {
    this.bookService.updateBook(book)
    const insertLend = lendBook as InsertLend
    const myBook = this.fillDataMyBook(insertLend, book) as InsertMyBooks;

    console.log('Guardando...')
    console.log(insertLend)
    this.myBookService.createMyBook(myBook).subscribe({
      next:() => console.log('My book Creado')
      , error: (err) => console.error(err)
    })

     const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.url}/lendbooks`, JSON.stringify(insertLend), { headers });
 
  }
}
