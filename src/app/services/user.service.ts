import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../users/list-users/list-users.component';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:8800/api/';
  constructor(private http: HttpClient) {}

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }
  viewUsers(id: string) {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
  addUser(userObj: User) {
    return this.http.post<User>(this.baseUrl + 'users', userObj);
  }
  deleteUser(id: any) {
    return this.http.delete<User>(this.baseUrl + 'users/' + id);
  }
  updateUser(userObj: User, id: any) {
    return this.http.put<User>(this.baseUrl + 'users/' + id, userObj);
  }
}
