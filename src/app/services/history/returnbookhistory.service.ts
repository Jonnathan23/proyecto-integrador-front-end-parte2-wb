import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminBook, MyBooks, ReturnBookHistory, TopClient } from '../../../assets/models/models';
import { DatabookService } from '../forbook/databook.service';
import { MybookserviceService } from '../forbook/mybookservice.service';

@Injectable({
  providedIn: 'root'
})
export class ReturnbookhistoryService {

  private url = 'http://localhost:8080/proyectobackend/bl-sv'
  constructor(private http: HttpClient, private bookService: DatabookService, private myBookService: MybookserviceService) { }

  getReturnBooks() {
    return this.http.get<ReturnBookHistory[]>(`${this.url}/returnbooks`)
  }

  getTopClient(){
    return this.http.get<TopClient>(`${this.url}/returnbooks/top-client`)
  }

  updateReturnBook(returnBook: ReturnBookHistory) {
    return this.http.put(`${this.url}/returnbooks`, returnBook)
  }

  createReturnBook(returnBook: ReturnBookHistory, book: AdminBook, myBookId: MyBooks['myBoo_id']) {
    
    this.bookService.updateBook(book).subscribe(
      request => {
        this.myBookService.deleteMyBook(myBookId!).subscribe(
          request => { console.log('Libro actualizado correctamente')}
          , (error) => console.error(error)
        )
      }, error => console.error(error)
    )

    return this.http.post(`${this.url}/returnbooks`, returnBook)
  }

  deleteReturnBook(id: ReturnBookHistory['retboo_id']) {
    return this.http.delete(`${this.url}/returnbooks/${id}`)
  }


}