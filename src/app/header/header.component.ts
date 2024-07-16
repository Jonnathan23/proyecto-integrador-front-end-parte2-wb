import { Component } from '@angular/core';
import { HeaderbienvenidaComponent } from "./headerbienvenida/headerbienvenida.component";
import { HeadersesionComponent } from "./headersesion/headersesion.component";
import { LoginserviceService } from '../services/foruser/loginservice.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderbienvenidaComponent, HeadersesionComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  ingreso: boolean = false;

  constructor(private loginService: LoginserviceService) { }

  ngOnInit() {
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!;

      if (userLocal.idUser) {
        this.ingreso = true;
      } else {
        this.ingreso = user.idUser ? true : false;
      }
    })
  }


}
