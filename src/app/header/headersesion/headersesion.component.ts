import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginserviceService } from '../../services/foruser/loginservice.service';

@Component({
  selector: 'app-headersesion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './headersesion.component.html',
  styleUrl: './headersesion.component.scss'
})
export class HeadersesionComponent {

  constructor(private loginService:LoginserviceService){}

  back() {
    this.loginService.back()
  }

}
