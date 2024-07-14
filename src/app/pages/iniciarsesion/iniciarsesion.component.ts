import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoginUser } from '../../../assets/models/models';

@Component({
  selector: 'app-iniciarsesion',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './iniciarsesion.component.html',
  styleUrl: './iniciarsesion.component.scss'
})
export class IniciarsesionComponent {
  loginUser: LoginUser = { email: '', password: '' }

  /**
   * TODO: falta el 'loginService'
   * @param form 
   */
  login(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    

  }

}
