import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LoginUser, UserType } from '../../../assets/models/models';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../storage/localstorage.service';
import { DatauserService } from './datauser.service';
import { errorSave, userExist } from '../../../alerts/alerts';
import { SelecteduserService } from './selecteduser.service';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  private imgDefault = 'assets/img/imageUser.jpg'
  private userRestart: UserType = { idUser: 0, name: '', lastname: '', cell: '', email: '', password: '', image: this.imgDefault, admin: false };
  private keyUser = 'userActive';
  private url = ''

  private userActive = new BehaviorSubject<UserType>(this.userRestart);
  userActive$: Observable<UserType> = this.userActive.asObservable();

  constructor(private router: Router, private localStorageService: LocalstorageService, private selectedUser: SelecteduserService, private userService: DatauserService) {
    const user = this.getUserStorage()
    if (!user) {
      this.localStorageService.setItem(this.keyUser, this.userRestart);

    } else if (user.idUser) {
      this.router.navigate(['/adminbooks']);

    }
  }


  async registerUser(user: UserType) {
    const userFound = this.searchUser(user.email)
    if (!userFound) {
      (await this.userService.createUser(user)).subscribe({
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

  async loginUser(user: LoginUser) {

    this.searchUser(user.email).pipe(
      tap((userFound) => {
        if (userFound && user.password === userFound.password) {
          this.userActive.next(userFound!);
          this.localStorageService.setItem(this.keyUser, userFound);
          this.selectedUser.setSelectedUser(userFound)

          this.router.navigate(['/adminbooks']);
        }
      })
    )
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  searchUser(email: string): Observable<UserType | null> {
    return this.userService.getUser(email).pipe(
      map((user) => user ? user : null)
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
