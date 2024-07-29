import { Injectable } from '@angular/core';
import { DatabookService } from '../forbook/databook.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminBook, InsertLend, InsertMyBooks, LendBookHistory, MyBooks, TopBooks, TopClient } from '../../../assets/models/models';
import { addLendBookError, addLendBookSuccess, errorSave, saveBook } from '../../../alerts/alerts';
import { MybookserviceService } from '../forbook/mybookservice.service';
import { tap } from 'rxjs';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class LendbookhistoryService {

  private lendBookRestar: LendBookHistory = { lenboo_id: 0, lenboo_category: '', lenboo_idBook: 0, lenboo_nameBook: '', lenboo_idUser: 0, lenboo_nameUser: '', lenboo_inicial_date: '', lenboo_limit_date: '' }
  private url = 'http://localhost:8080/proyectobackend/bl-sv'

  constructor(private bookService: DatabookService, private http: HttpClient, private myBookService: MybookserviceService) { }

  fillDataMyBook(lendBook: LendBookHistory, book: AdminBook) {
    const myBook: MyBooks = {
      myBoo_idUser: lendBook.lenboo_idUser,
      myBoo_nameUser: lendBook.lenboo_nameUser,
      myBoo_idBook: book.boo_id,
      myBoo_nameBook: book.boo_name,
      myBoo_stateBook: book.boo_state,
      myBoo_inicial_date: lendBook.lenboo_inicial_date,
      myBoo_limit_date: lendBook.lenboo_limit_date
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

  getLendBooks() {
    return this.http.get<LendBookHistory[]>(`${this.url}/lendbooks`)
  }
  
  getLendBookRestar() {
    return this.lendBookRestar;
  }

  getLendBookByIdBook(idBook:LendBookHistory['lenboo_idBook'], idUser:LendBookHistory['lenboo_idUser']){
    return this.http.get<LendBookHistory>(`${this.url}/lendbooks/book/${idBook}/user/${idUser}`)
  }

  getMostReadBooksByMonth(){
    return this.http.get<TopBooks[]>(`${this.url}/lendbooks/top-books`)
  }
  

  /**   
   * @param lendBook 
   * @param book 
   * @returns 
   */
  addLendBook(lendBook: LendBookHistory, book: AdminBook) {
    this.bookService.updateBook(book).subscribe(
      request => {
        
      }
      , error => {
        console.log('Error al actualizar el estado del libro')
        console.error(error)
      }
    )

    const insertLend = this.fillDataLendBook(lendBook)
    const myBook = this.fillDataMyBook(insertLend, book) as InsertMyBooks;        
    console.log('MyBook')
    console.log(myBook)
    this.myBookService.createMyBook(myBook).subscribe({
      next: () => addLendBookSuccess()
      , error: () => addLendBookError()
    })

    return this.http.post(`${this.url}/lendbooks`, insertLend);
  }
  updateLendBook(lendBook: LendBookHistory){
    return this.http.put(`${this.url}/lendbooks`, lendBook)
  }

  deleteLendBook(idLendBook: LendBookHistory['lenboo_id']){
    return this.http.delete(`${this.url}/lendbooks/${idLendBook}`)
  }   
}