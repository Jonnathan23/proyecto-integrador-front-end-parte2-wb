import { Component } from '@angular/core';
import { LoginserviceService } from '../../services/foruser/loginservice.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-headeruser',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './headeruser.component.html',
  styleUrl: './headeruser.component.scss'
})
export class HeaderuserComponent {
  constructor(private loginService: LoginserviceService ) { }

  back() {
    this.loginService.back();
  }

}
