import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReturnBookHistory } from '../../../assets/models/models';

@Injectable({
  providedIn: 'root'
})
export class ReturnbookhistoryService {

  private url = 'http://localhost:8080/proyectobackend/bl-sv'
  constructor(private http:HttpClient) { }

  getReturnBooks(){
    return this.http.get<ReturnBookHistory[]>(`${this.url}/returnbooks`)
  }
}
