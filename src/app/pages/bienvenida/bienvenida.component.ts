import { Component } from '@angular/core';
import { Atribuciones } from '../../../assets/models/models';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.scss'
})
export class BienvenidaComponent {
  atribuciones: Atribuciones[] = []
}
