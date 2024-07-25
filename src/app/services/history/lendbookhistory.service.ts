import { Injectable } from '@angular/core';
import { DatabookService } from '../forbook/databook.service';
import { HttpClient } from '@angular/common/http';
import { LendBookHistory } from '../../../assets/models/models';

@Injectable({
  providedIn: 'root'
})
export class LendbookhistoryService {

  private url = 'http://localhost:8080/proyectobackend/bl-sv'
  constructor(private bookService: DatabookService, private http: HttpClient) { }

  getLendBooks() {
    return this.http.get<LendBookHistory[]>(`${this.url}/lendbooks`)
  }
}
