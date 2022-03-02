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
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userId: any;
  user: any;
  dataLoaded: boolean = false;
  editUserForm: FormGroup = new FormGroup({});
  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  updateUser() {
    this.userService.updateUser(this.editUserForm.value, this.userId).subscribe(
      (data) => {
        console.log(data);
        this._snackBar.open('Update user successfully!');
        this.router.navigateByUrl('/users/list');
      },
      (err) => {
        this._snackBar.open('Update user fail!');
      }
    );
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((data) => {
      this.userId = data['id'];
    });
    if (this.userId) {
      this.userService
        .viewUsers(this.userId)
        .toPromise()
        .then((data) => {
          this.user = data;
          console.log(data);
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
        });
    }
  }
}
