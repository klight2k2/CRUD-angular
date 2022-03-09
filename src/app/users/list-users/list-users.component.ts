import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, SubscriptionLike } from 'rxjs';
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
export class ListUsersComponent implements OnInit, OnDestroy {
  subscribeUsers!: SubscriptionLike;
  listUsers!: User[];
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'actions'];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscribeUsers = this.userService.listUsers().subscribe((users) => {
      this.listUsers = users;
    });
  }
  ngOnDestroy(): void {
    this.subscribeUsers.unsubscribe();
    console.log('unsubscribe');
  }
}
