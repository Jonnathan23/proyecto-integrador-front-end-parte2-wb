import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminBook, MyBooks, ReturnBookHistory } from '../../../assets/models/models';
import { DatabookService } from '../forbook/databook.service';
import { MybookserviceService } from '../forbook/mybookservice.service';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class ReturnbookhistoryService {

  private url = 'http://localhost:8080/proyectobackend/bl-sv'
  constructor(private http: HttpClient, private bookService: DatabookService, private myBookService: MybookserviceService) { }

  getReturnBooks() {
    return this.http.get<ReturnBookHistory[]>(`${this.url}/returnbooks`)
  }

  updateReturnBook(returnBook: ReturnBookHistory) {
    return this.http.put(`${this.url}/returnbooks`, returnBook)
  }

  createReturnBook(returnBook: ReturnBookHistory, book: AdminBook, myBookId: MyBooks['myBoo_id']) {
    this.bookService.updateBook(book)
    this.myBookService.deleteMyBook(myBookId!).subscribe(
      request => {}
      , (error) => console.error(error)
    )

    return this.http.post(`${this.url}/returnbooks`, returnBook)
  }

  deleteReturnBook(id: ReturnBookHistory['retboo_id']) {
    return this.http.delete(`${this.url}/returnbooks/${id}`)
  }


}
