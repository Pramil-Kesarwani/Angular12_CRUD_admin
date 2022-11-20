import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../users/list-users/list-users.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://jsonplaceholder.cypress.io/';

  listUsers():Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }
  viewUser(id:string) {
    return this.http.get(this.baseUrl + 'users/' + id)
  }
  addUser(userObj: any) {
    return this.http.post(this.baseUrl + 'users' , userObj)
  }
  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + 'users/' + id)
  }
  editUser(id: string, userObj: any) {
    return this.http.put(this.baseUrl + 'users/' + id , userObj)
  }
}
