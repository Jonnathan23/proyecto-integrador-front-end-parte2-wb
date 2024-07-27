import { Injectable } from '@angular/core';
import { DatabookService } from '../forbook/databook.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminBook, InsertLend, InsertMyBooks, LendBookHistory, MyBooks } from '../../../assets/models/models';
import { addLendBookError, addLendBookSuccess, errorSave, saveBook } from '../../../alerts/alerts';
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

  fillDataLendBook(lendBook: LendBookHistory) {
    const insertLend: InsertLend = {
      lenboo_category: lendBook.lenboo_category,
      lenboo_idBook: lendBook.lenboo_idBook,
      lenboo_nameBook: lendBook.lenboo_nameBook,
      lenboo_idUser: lendBook.lenboo_idUser,
      lenboo_nameUser: lendBook.lenboo_nameUser,
      lenboo_inicial_date: lendBook.lenboo_inicial_date,
      lenboo_limit_date: lendBook.lenboo_limit_date,
    }

    return insertLend;
  }

  /**   
   *  * Funciona el myBook
   * @param lendBook 
   * @param book 
   * @returns 
   */
  addLendBook(lendBook: LendBookHistory, book: AdminBook) {
    this.bookService.updateBook(book)

    const insertLend = this.fillDataLendBook(lendBook)
    const myBook = this.fillDataMyBook(insertLend, book) as InsertMyBooks;    

    this.myBookService.createMyBook(myBook).subscribe({
      next: () => addLendBookSuccess()
      , error: () => addLendBookError()
    })

    return this.http.post(`${this.url}/lendbooks`, insertLend);

  }
}
