import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UserType } from '../../../assets/models/models';
import { errorInputs, shortPassword } from '../../../alerts/alerts';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss'
})
export class RegistrarseComponent {

  newUser!: UserType;

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

    if(password.length <= 6){
      shortPassword()
      return false;
    }
    return true
  }

/**
 * TODO falta el loginService
 * @param form 
 * @returns 
 */
  registerNewUser(form: NgForm) {
    const isVerify = this.checkForm(form);

    if (isVerify) {
      const { name, lastname, cell, email, password,checkIsAdmin } = form.value;
      this.newUser.us_name = name;
      this.newUser.us_lastname = lastname;
      this.newUser.us_email = email;
      this.newUser.us_cell = cell;
      this.newUser.us_password = password;
      this.newUser.us_admin = checkIsAdmin;
            
      
      return;
    }
    errorInputs();

  }

}
