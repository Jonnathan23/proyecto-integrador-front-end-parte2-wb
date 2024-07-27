import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UseradminComponent } from '../useradmin/useradmin.component';
import { UserType } from '../../../assets/models/models';
import { shortPassword, errorInputs, modifyUser, errorSave } from '../../../alerts/alerts';
import { ErrorShortPassword } from '../../../errors/errors';
import { DatauserService } from '../../services/foruser/datauser.service';
import { SelecteduserService } from '../../services/foruser/selecteduser.service';
import { LoginserviceService } from '../../services/foruser/loginservice.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UseradminComponent, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  imgDefault: string
  myUser!: UserType  //Usuario dueño de la sesión
  userModify!: UserType  //

  nombre = ''
  apellido = ''
  cell = ''
  correo = ''
  myPassword = ''
  @ViewChild('checkIsAdmin') checkAdmin!: ElementRef;
  @ViewChild('userImg') imgUser!: ElementRef;

  constructor(private render: Renderer2, private userService: DatauserService, private loginService: LoginserviceService, private selectedUserService: SelecteduserService) {
    this.imgDefault = this.selectedUserService.getImgDefault()
  }

  ngOnInit() {
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!;
      this.myUser = userLocal.us_id ? userLocal : user;
    })


    this.selectedUserService.getSelectedUser().subscribe((user) => {

      if (user.us_id) {
        this.userModify = user
      } else {
        this.userModify = this.loginService.getUserStorage()!
      }
      console.log(this.userModify)
      setTimeout(() => {
        this.nombre = this.userModify.us_name!
        this.apellido = this.userModify.us_lastname!
        this.cell = this.userModify.us_cell!
        this.correo = this.userModify.us_email!
        this.myPassword = this.userModify.us_password!
        this.render.setProperty(this.checkAdmin.nativeElement, 'checked', this.userModify.us_admin ?? false)
        this.render.setProperty(this.imgUser.nativeElement, 'src', this.userModify.us_image)

      }, 0)

    })

  }

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
    this.userModify.us_name = this.nombre
    this.userModify.us_lastname = this.apellido
    this.userModify.us_cell = this.cell
    this.userModify.us_email = this.correo
    this.userModify.us_password = this.myPassword
    this.userModify.us_image = this.imgUser.nativeElement.src
    this.userModify.us_admin = this.checkAdmin.nativeElement.checked
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
    if (isVerify) {
      this.userService.updateUser(this.userModify).subscribe({
        next: () => modifyUser()
        , error: () => errorSave()
      })

    }

  }


}
