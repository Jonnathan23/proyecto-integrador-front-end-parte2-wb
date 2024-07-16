import { Component } from '@angular/core';
import { UserType } from '../../../assets/models/models';
import { DatauserService } from '../../services/foruser/datauser.service';
import { SelecteduserService } from '../../services/foruser/selecteduser.service';

@Component({
  selector: 'app-useradmin',
  standalone: true,
  imports: [],
  templateUrl: './useradmin.component.html',
  styleUrl: './useradmin.component.scss'
})
export class UseradminComponent {
  users:UserType[] = []

  userSelec!:UserType

  constructor(private userService: DatauserService, private selectedUserService: SelecteduserService) { }

  ngOnInit(){    
    this.userService.getUsers().subscribe(users => this.users = users)
  }

  selectedUser(user:UserType){
    this.selectedUserService.setSelectedUser(user)
  }

}
