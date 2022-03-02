import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
export interface User {
  name: string;
  id: number;
  username: string;
  email: string;
  website: string;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  listUsers: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'actions'];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.listUsers().subscribe((data) => {
      this.listUsers = data;
    });
  }
}
