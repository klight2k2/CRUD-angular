import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../list-users/list-users.component';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userId: any;
  user!: User;
  dataLoaded: boolean = false;
  editUserForm: FormGroup = new FormGroup({});
  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  public async loadUser() {
    const user$ = this.userService.viewUsers(this.userId);
    this.user = await lastValueFrom(user$);
    console.log(this.user);
    this.dataLoaded = true;
    this.editUserForm = this.formBuilder.group({
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(3),
      ]),
      website: new FormControl(this.user.website, [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }
  updateUser() {
    this.userService
      .updateUser(this.editUserForm.value, this.userId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.snackBar.open('Update user successfully!');
          this.router.navigateByUrl('/users/list');
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open('Update user fail!');
        },
      });
  }

  ngOnInit(): void {
    this.activateRoute.params
      .subscribe((data) => {
        this.userId = data['id'];
      })
      .unsubscribe();
    if (this.userId) {
      this.loadUser();
    }
  }
}
