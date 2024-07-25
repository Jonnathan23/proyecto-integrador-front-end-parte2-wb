import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginUser, UserType } from '../../../assets/models/models';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../storage/localstorage.service';
import { DatauserService } from './datauser.service';
import { errorSave, errorSignIn, userExist } from '../../../alerts/alerts';
import { SelecteduserService } from './selecteduser.service';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  private imgDefault = 'assets/img/imageUser.jpg'
  private userRestart: UserType = { us_id: 0, us_name: '', us_lastname: '', us_cell: '', us_email: '', us_password: '', us_image: this.imgDefault, us_admin: false };
  /**
   * ! Borrar esta variable,solo es temporar
   */
  private userDefault: UserType = {
    us_id: 2, us_name: 'Jackson', us_lastname: 'Pearson', us_cell: '0989621136', us_email: 'danharman@gmail.com', us_password: 'dani123456', us_image: this.imgDefault, us_admin: false
  }
  private keyUser = 'userActive';

  private userActive = new BehaviorSubject<UserType>(this.userRestart);
  userActive$: Observable<UserType> = this.userActive.asObservable();

  constructor(private router: Router, private localStorageService: LocalstorageService, private selectedUser: SelecteduserService, private userService: DatauserService) {
    const user = this.getUserStorage()
    if (!user) {
      this.localStorageService.setItem(this.keyUser, this.userRestart);

    } else if (user.us_id) {
      this.router.navigate(['/adminbooks']);

    }
  }
  /**
   * ! Borrar esta funcion
   */
  getDefaultUser(){
    return this.userDefault;
  }

  registerUser(user: UserType) {
    const userFound = this.searchUser(user.us_email!)
    if (!userFound) {
      (this.userService.createUser(user)).subscribe({
        next: () => {
          this.localStorageService.setItem(this.keyUser, user);
          this.userActive.next(user)
          this.selectedUser.setSelectedUser(user)

          this.router.navigate(['/adminbooks'])
        }
        , error: (e) => errorSave()
      })
    } else {
      userExist()
    }
  }

  loginUser(user: LoginUser) {
    this.userService.getToken(user).subscribe(
      response => {
        console.log('Response from login:', response); // Imprimir respuesta      
        console.log('Token:', response.jwt); // Imprimir token

        response.jwt && this.userService.getLoginUser(response.jwt!)
      },
      error => {
        console.error('Login error:', error);
      }
    )
  }


  /**
   * 
   * @param id 
   * @returns 
   */
  searchUser(email: string): Observable<UserType | null> {
    return this.userService.getUser(email)
  }

  /**
   * TODO falta el cerrar sesión con el Token
   */
  back() {
    this.localStorageService.clear()
    this.localStorageService.setItem(this.keyUser, this.userRestart)
    this.userActive.next(this.userRestart);
    this.selectedUser.setSelectedUser(this.userRestart)
    this.router.navigate(['/bienvenido']);
  }


  /**
  * @description obtiene el usuario del localStorage o el userRestart
  * @returns UserType
  */
  getUserStorage(): UserType {
    const user: UserType | null = this.localStorageService.getItem<UserType>(this.keyUser);
    if (user) {
      return user;
    } else {
      this.localStorageService.setItem(this.keyUser, this.userRestart);
      return this.userRestart;
    }
  }

  getUserRestart() {
    return this.userRestart;
  }

  getUserActive() {
    return this.userActive$
  }

  
}
