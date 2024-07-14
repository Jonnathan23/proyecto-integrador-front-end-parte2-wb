import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-headerbienvenida',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './headerbienvenida.component.html',
  styleUrl: './headerbienvenida.component.scss'
})
export class HeaderbienvenidaComponent {

  constructor(private route: Router) { }

  goHome() {
    this.route.navigate(['/bienvenido']);
  } 

}
