import { Component } from '@angular/core';
import { HeaderbienvenidaComponent } from "./headerbienvenida/headerbienvenida.component";
import { HeadersesionComponent } from "./headersesion/headersesion.component";
import { LoginserviceService } from '../services/foruser/loginservice.service';
import { HeaderuserComponent } from "./headeruser/headeruser.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderbienvenidaComponent, HeadersesionComponent, HeaderuserComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  ingreso: boolean = false;
  isAdmin!: boolean

  constructor(private loginService: LoginserviceService) { }

  ngOnInit() {
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!;

      if (userLocal.us_id) {
        this.ingreso = true;
        this.isAdmin = userLocal.us_admin!
        
      } else if (user.us_id) {
        this.ingreso = true
        this.isAdmin = user.us_admin!
      } else {
        this.ingreso = false
      }

    })
  }


}
