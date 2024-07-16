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
  url = ''

  constructor(private http: HttpClient) {
    this.loadBooks
  }

  private loadBooks() {
    this.http.get<AdminBook[]>('')
      .pipe(
        tap((books) => this.booksSubject.next(books)),
        catchError(this.handleError)
      ).subscribe()
  }

  getBooks() {
    return this.http.get<AdminBook[]>(`${this.url}/books`)
      .pipe(
        tap((books) => this.booksSubject.next(books)),
        catchError(this.handleError)
      )

  }


  async createBook(book: BookType) {
    return this.http.post(`${this.url}/books`, book).pipe(
      tap(() => this.loadBooks()),
      catchError(this.handleError)
    )
  }

  async updateBook(book: AdminBook) {
    return this.http.put(`${this.url}/books`, book).pipe(
      tap(() => this.loadBooks()),
      catchError(this.handleError)
    )
  }

  async deleteBook(id: number) {
    return this.http.delete(`${this.url}/books?id=${id}`).pipe(
      tap(() => this.loadBooks()),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new ConnectionError(error.message))
  }

}


