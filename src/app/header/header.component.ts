import { Component } from '@angular/core';
import { HeaderbienvenidaComponent } from "./headerbienvenida/headerbienvenida.component";
import { HeadersesionComponent } from "./headersesion/headersesion.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderbienvenidaComponent, HeadersesionComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  ingreso = true
}
