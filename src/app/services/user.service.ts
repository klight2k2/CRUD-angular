import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../users/list-users/list-users.component';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {}

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }
  viewUsers(id: string) {
    return this.http.get(this.baseUrl + 'users/' + id);
  }
  addUser(userObj: any) {
    return this.http.post(this.baseUrl + 'users', userObj);
  }
  deleteUser(id: any) {
    return this.http.delete(this.baseUrl + 'users/' + id);
  }
  updateUser(userObj: any, id: any) {
    return this.http.put(this.baseUrl + 'users/' + id, userObj);
  }
}
