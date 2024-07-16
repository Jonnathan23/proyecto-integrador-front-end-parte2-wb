import { Component } from '@angular/core';
import { UserType } from '../../../assets/models/models';
import { AdminComponent } from "./admin/admin.component";
import { BooksComponent } from "./books/books.component";
import { LoginserviceService } from '../../services/foruser/loginservice.service';

@Component({
  selector: 'app-adminbooks',
  standalone: true,
  imports: [AdminComponent, BooksComponent],
  templateUrl: './adminbooks.component.html',
  styleUrl: './adminbooks.component.scss'
})
export class AdminbooksComponent {
  user! :UserType

  constructor(private loginService:LoginserviceService){}

  ngOnInit(){
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!; 
       this.user = userLocal.idUser ? userLocal : user;
    })
  }
}
