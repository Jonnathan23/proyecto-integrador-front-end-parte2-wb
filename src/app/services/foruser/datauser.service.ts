import { Injectable } from '@angular/core';
import { UserType } from '../../../assets/models/models';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConnectionError } from '../../../errors/errors';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class DatauserService {
  private usersSubject = new BehaviorSubject<UserType[]>([]);
  users$: Observable<UserType[]> = this.usersSubject.asObservable();
  url = ''

  constructor(private http: HttpClient) {
    this.loadUsers()
  }


  private loadUsers() {
    this.http.get<UserType[]>('')
      .pipe(
        tap((users) => this.usersSubject.next(users)),
        catchError(this.handleError)
      ).subscribe()
  }

  getUser(email: string) {
    return this.http.get<UserType>(`${this.url}/users?email=${email}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(null)
        })
      )
  }

  getUsers() {
    return this.http.get<UserType[]>(`${this.url}/users`)
      .pipe(
        tap((users) => this.usersSubject.next(users)),
        catchError(this.handleError)
      )

  }

  async createUser(user: UserType) {
    return this.http.post(`${this.url}/users`, user).pipe(
      tap(() => this.loadUsers()),
      catchError(this.handleError)
    )
  }

  async updateUser(user: UserType) {
    return this.http.put(`${this.url}/users`, user).pipe(
      tap(() => this.loadUsers()),
      catchError(this.handleError)
    )
  }

  async deleteUser(id: number) {
    return this.http.delete(`${this.url}/users?id=${id}`).pipe(
      tap(() => this.loadUsers()),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new ConnectionError(error.message))
  }


}
