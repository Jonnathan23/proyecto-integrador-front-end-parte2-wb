import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, } from 'rxjs';
import { InsertUser, LoginUser, UserType } from '../../../assets/models/models';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../storage/localstorage.service';
import { DatauserService } from './datauser.service';
import { errorSignIn, userExist } from '../../../alerts/alerts';
import { SelecteduserService } from './selecteduser.service';
import { generateWindow } from '../../../funtions/funtions.format';
import { ResendService } from './resend.service';
import { MybookserviceService } from '../forbook/mybookservice.service';
import { error } from 'console';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  private imgDefault = 'assets/img/imageUser.jpg'
  private userRestart: UserType = { us_id: 0, us_name: '', us_lastname: '', us_cell: '', us_email: '', us_password: '', us_image: this.imgDefault, us_admin: false };
  private keyUser = 'userActive';

  private userActive = new BehaviorSubject<UserType>(this.userRestart);
  userActive$: Observable<UserType> = this.userActive.asObservable();

  constructor(private router: Router, private localStorageService: LocalstorageService,
    private selectedUser: SelecteduserService, private userService: DatauserService,
    private resendService: ResendService, private myBooksService: MybookserviceService
  ) {
    const user = this.getUserStorage()
    if (!user) {
      this.localStorageService.setItem(this.keyUser, this.userRestart);

    } else if (user.us_id) {
      this.router.navigate(['/adminbooks']);

    }
  }

  registerUser(user: InsertUser) {
    this.userService.getUserByEmail(user.us_email!).subscribe(
      userFound => {
        if (!userFound) {
          this.userService.createUser(user).subscribe(
            () => this.loginUser({ username: user.us_email!, password: user.us_password! }),
            error => console.log(error)
          )
        } else {
          userExist()
        }

      }
      , error => console.log(error)
    )
  }

  loginUser(user: LoginUser) {
    this.userService.getToken(user).subscribe(
      response => {

        response.jwt && this.userService.getLoginUser(response.jwt!).subscribe({
          next: (userLoged) => {
            this.localStorageService.setItem(this.keyUser, userLoged)
            this.userActive.next(userLoged)

            this.selectedUser.setSelectedUser(userLoged)
            //console.log(userLoged)

            this.sendEmail(userLoged)

            this.router.navigate(['/adminbooks'])
            generateWindow(userLoged.us_id!)
          }
          , error: () => errorSignIn()
        })
      },
      error => {
        errorSignIn()
        console.log(error)
      }
    )
  }

  sendEmail(user: UserType) {
    this.myBooksService.getPendingBooks(user.us_id).subscribe(
      myBooks => {
        console.log(myBooks)
        let message = "Tus libros pendientes son: \n"
        myBooks.forEach(myBook => message += `- ${myBook.myBoo_nameBook} ${myBook.myBoo_limit_date} \n`)
        console.log(message)

        this.resendService.sendEmail(
          "jonnasaquicela@gmail.com",
          "Recordatorio",
          message
        ).then(response => {
          console.log('Correo enviado:', response);
        }).catch(error => {
          console.error('Error al enviar el correo:', error);
        });
      }
      , error => console.log(error)
    )
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