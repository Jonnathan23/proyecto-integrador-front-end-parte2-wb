import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoginUser } from '../../../assets/models/models';
import { LoginserviceService } from '../../services/foruser/loginservice.service';
import { errorSignIn } from '../../../alerts/alerts';

@Component({
  selector: 'app-iniciarsesion',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './iniciarsesion.component.html',
  styleUrl: './iniciarsesion.component.scss'
})
export class IniciarsesionComponent {
  loginUser: LoginUser = { username: '', password: '' }

  constructor(private loginService: LoginserviceService) { }

  /**
   * TODO: falta el 'loginService'
   * @param form 
   */
  login(form: NgForm) {

    this.loginUser.username = form.value.email;
    this.loginUser.password = form.value.password;

    this.loginService.loginUser(this.loginUser)

  }

}
