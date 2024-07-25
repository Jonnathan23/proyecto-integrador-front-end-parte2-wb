import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AdminBook, BookType, StateBook } from '../../../assets/models/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ConnectionError } from '../../../errors/errors'

@Injectable({
  providedIn: 'root'
})
export class DatabookService {

  url = 'http://localhost:8080/proyectobackend/bl-sv'

  constructor(private http: HttpClient) {
  }

  //|---- Funciones de busqueda ----|
  searchCategoryBooks(category: string) {
    return this.http.get<AdminBook[]>(`${this.url}/books/category/${category}`)
  }

  searchNameBooks(name: string) {
    return this.http.get<AdminBook[]>(`${this.url}/books/name/${name}`)
  }

  searchAutorBooks(autor: string) {
    return this.http.get<AdminBook[]>(`${this.url}/books/autor/${autor}`)
  }

  searchAvailabilityBooks(state: StateBook['description']) {
    return this.http.get<AdminBook[]>(`${this.url}/books/availability/${state}`)
  }

  //|---- Metodos HTTP ----|
  getBooks() {
    return this.http.get<AdminBook[]>(`${this.url}/books`)
  }

  createBook(book: BookType) {
    return this.http.post(`${this.url}/books`, book)
  }

  updateBook(book: AdminBook) {
    return this.http.put(`${this.url}/books`, book)
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new ConnectionError(error.message))
  }

}


