import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyBooks } from '../../../assets/models/models';

@Injectable({
  providedIn: 'root'
})
export class MybookserviceService {

  url = 'http://localhost:8080/proyectobackend/bl-sv'
  constructor(private http: HttpClient) { }

  getMyBooks(id:number) {
    return this.http.get<MyBooks>(`${this.url}/mybooks/mb/${id}`)
  }

  createMyBook(myBook: MyBooks) {
    return this.http.post(`${this.url}/mybooks`, myBook);
  }

  upDateMyBook(myBook: MyBooks) {
    return this.http.put(`${this.url}/mybooks`, myBook)
  }

  deleteMyBook(id: number) {
    return this.http.delete(`${this.url}/mybooks/${id}`)
  }

}
