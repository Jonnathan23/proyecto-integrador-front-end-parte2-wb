import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UseradminComponent } from '../useradmin/useradmin.component';
import { UserType } from '../../../assets/models/models';
import { shortPassword, errorInputs, modifyUser, errorSave } from '../../../alerts/alerts';
import { ErrorShortPassword } from '../../../errors/errors';
import { DatauserService } from '../../services/foruser/datauser.service';
import { SelecteduserService } from '../../services/foruser/selecteduser.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UseradminComponent, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  imgDefault!: string
  myUser!: UserType  //Usuario dueño de la sesión
  userModify!: UserType  //

  nombre = ''
  apellido = ''
  cell = ''
  correo = ''
  myPassword = ''
  @ViewChild('checkIsAdmin') checkAdmin!: ElementRef;
  @ViewChild('userImg') imgUser!: ElementRef;

  constructor(private userService:DatauserService, private selectedUserService: SelecteduserService){}

  selectImg(e: Event, img: HTMLImageElement) {
    const input = e.target as HTMLInputElement

    //Verifica si se ha seleccionado la imagen
    if (input.files?.[0]) {
      const reader = new FileReader()
      reader.onload = () => img.src = reader.result as string
      reader.readAsDataURL(input.files[0])

    } else {
      img.src = this.imgDefault

    }
  }

  getAllInputs() {
    this.userModify.name = this.nombre
    this.userModify.lastname = this.apellido
    this.userModify.cell = this.cell
    this.userModify.email = this.correo
    this.userModify.password = this.myPassword
    this.userModify.image = this.imgUser.nativeElement.src
    this.userModify.admin = this.checkAdmin.nativeElement.checked
  }

  checkInputs(): boolean {
    this.getAllInputs()

    try {
      if (!this.nombre) return false
      if (!this.apellido) return false
      if (!this.cell) return false
      if (!this.correo) return false
      if (!this.myPassword) return false
      if (this.myPassword.length < 8) throw new ErrorShortPassword('Contraseña demasiado corta')

      return true
    } catch (error) {
      if (error instanceof ErrorShortPassword) shortPassword()

      return false
    }
  }
  
  /**
   * 
   */
  saveChanges() {
    const isVerify = this.checkInputs()
    if(isVerify)  {
      this.userService.updateUser(this.userModify)
      .then(() => modifyUser())
      .catch(() => errorSave())
    }
    
  }


}
