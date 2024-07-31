import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyBooks, UserType } from '../../../assets/models/models';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MybookserviceService {

  url = `${environment.domain}`
  constructor(private http: HttpClient) { }

  getMyBooks(id: number) {
    return this.http.get<MyBooks[]>(`${this.url}/mybooks/mb/${id}`)
  }

  getPendingBooks(idUser: UserType['us_id']) {
    return this.http.get<MyBooks[]>(`${this.url}/mybooks/overdue/${idUser}`)
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
