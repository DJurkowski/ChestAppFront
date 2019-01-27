import { TokenStorageService } from './../../auth/token-storage.service';
import { UserListComponent } from './../user-list/user-list.component';
import { User } from './../user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;

  username: string;
  errorMessage = '';

  constructor(private listComponent: UserListComponent, private token: TokenStorageService) { }

  ngOnInit() {
    this.username = this.token.getUsername();
  }

}
