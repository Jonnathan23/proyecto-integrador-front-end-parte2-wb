import { Injectable } from '@angular/core';
import { LoginUser, TokenUser, UserType } from '../../../assets/models/models';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ConnectionError } from '../../../errors/errors';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DatauserService {
  private usersSubject = new BehaviorSubject<UserType[]>([]);
  users$: Observable<UserType[]> = this.usersSubject.asObservable();
  url = 'http://localhost:8080/proyectobackend/bl-sv'

  constructor(private http: HttpClient) { }

  getUser(id: any) {
    return this.http.get<UserType>(`${this.url}/${id}`)
  }

  getUsers() {
    return this.http.get<UserType[]>(`${this.url}/users/list-users`)
      .pipe(
        tap((users) => this.usersSubject.next(users)),
        catchError(this.handleError)
      )
  }

  createUser(user: UserType) {
    return this.http.post(`${this.url}/users`, user).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(user: UserType) {
    return this.http.put(`${this.url}/users`, user).pipe(
      catchError(this.handleError)
    )
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.url}/users/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  getLoginUser(token: string) {
    const id = jwtDecode(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    //return this.http.get<UserType>(`${this.url}/users/${id}`, {headers})
  }

  getToken(user: LoginUser) {
    return this.http.post<TokenUser>(`${this.url}/auth/login`, user)
  }

  private handleError(error: HttpErrorResponse): Observable<never> {

    return throwError(() => new ConnectionError(error.message))
  }


}