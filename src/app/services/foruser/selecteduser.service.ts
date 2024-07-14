import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserType } from '../../../assets/models/models';

@Injectable({
  providedIn: 'root'
})
export class SelecteduserService {
  private imgDefault = 'assets/img/imageUser.jpg'
  private inicialUser: UserType = { idUser: 0, name: '', lastname: '', cell: '', email: '', password: '', image: this.imgDefault, admin: false };
  private selectedUser = new BehaviorSubject<UserType>(this.inicialUser)
  selectedUser$: Observable<UserType> = this.selectedUser.asObservable();

  constructor() { }

  /**
  * @description pone en obsevacion al usuario seleccionado
  * @param userSelec 
  */
  setSelectedUser(userSelec: UserType) {
    this.selectedUser.next(userSelec)
  }

  getSelectedUser() {
    return this.selectedUser$;
  }

  getImgDefault() {
    return this.imgDefault
  }
}
