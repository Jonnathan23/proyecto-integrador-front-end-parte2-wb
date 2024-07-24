import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AdminBook, BookType } from '../../../assets/models/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ConnectionError } from '../../../errors/errors'

@Injectable({
  providedIn: 'root'
})
export class DatabookService {
  private booksSubject = new BehaviorSubject<AdminBook[]>([]);
  books$: Observable<AdminBook[]> = this.booksSubject.asObservable();
  url = 'http://localhost:8080/proyectobackend/bl-sv'

  constructor(private http: HttpClient) {    
  }
/*
  private loadBooks() {
    
    this.http.get<AdminBook[]>(this.url)
      .pipe(
        tap((books) => this.booksSubject.next(books)),
        catchError(this.handleError)
      )//.subscribe()
  }
*/
  getBooks() {
    return this.http.get<AdminBook[]>(`${this.url}/books`)     

  }


  createBook(book: BookType) {
    return this.http.post(`${this.url}`, book)
  }

  updateBook(book: AdminBook) {
    return this.http.put(`${this.url}`, book)    
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  listBooks(){
    return this.books$
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new ConnectionError(error.message))
  }

}


