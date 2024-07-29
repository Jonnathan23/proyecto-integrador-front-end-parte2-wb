import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { InsertUser } from '../../../assets/models/models';
import { errorInputs, shortPassword } from '../../../alerts/alerts';
import { LoginserviceService } from '../../services/foruser/loginservice.service';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss'
})
export class RegistrarseComponent {

  newUser: InsertUser;

  constructor(private loginService: LoginserviceService) {
    const tempUser = this.loginService.getUserRestart()
    this.newUser = {
      us_name: tempUser.us_name,
      us_lastname: tempUser.us_lastname,
      us_cell: tempUser.us_cell,
      us_email: tempUser.us_email,
      us_password: tempUser.us_password,
      us_image: tempUser.us_image,
      us_admin: tempUser.us_admin,
    }
    console.log(this.newUser)
  }

  /**
   * @description Valida que los campos de texto estén llenos
   * @returns boolean
   */
  checkForm(form: NgForm): Boolean {
    const { name, lastname, cell, email, password } = form.value;

    if (!name) return false;
    if (!lastname) return false;
    if (!cell) return false;
    if (!email) return false;
    if (!password) return false;

    if (password.length <= 6) {
      shortPassword()
      return false;
    }
    return true
  }


  /**
   * @param form 
   * @returns 
   */
  registerNewUser(form: NgForm) {
    const isVerify = this.checkForm(form);
    console.log(form.value)
    console.log(isVerify)
    if (isVerify) {
      const { name, lastname, cell, email, password, checkIsAdmin } = form.value;

      console.log(`name:${name}, lastname: ${lastname}, cell: ${cell}, email ${email}, password: ${password}, checkIsAdmin: ${checkIsAdmin}`)

      this.newUser.us_name = name;
      this.newUser.us_lastname = lastname;
      this.newUser.us_email = email;
      this.newUser.us_cell = `0${cell}`;
      this.newUser.us_password = password;
      this.newUser.us_admin = checkIsAdmin ? true : false;

      console.log(this.newUser)

      this.loginService.registerUser(this.newUser)


    } else{
      errorInputs();
    }

  }

}