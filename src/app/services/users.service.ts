import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { UserAdminView } from '../models/UserAdminView';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<Array<UserAdminView>> {
    return this.http.get<Array<UserAdminView>>(environment.backendUrl + "/api/v1/users");
  }

  public updateUser(user: UserAdminView): Observable<UserAdminView> {
    return this.http.put<UserAdminView>(environment.backendUrl + "/api/v1/users", user);
  }

  public deleteUser(user: UserAdminView): Observable<boolean> {
    return this.http.delete<boolean>(environment.backendUrl + "/api/v1/users/" + user.id);
  }

  public deleteMe(): Observable<boolean> {
    return this.http.delete<boolean>(environment.backendUrl + "/api/v1/users/1");
  }
}
