import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import {User} from "../_model/user";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _baseUrl = `${environment.apiUrl}`; 

  constructor(private http: HttpClient, public authService: AuthService) {}

  public getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.currentUserValue?.token
    })

    return this.http.get<User[]>
      ( this._baseUrl + "/users?fields=id,first_name,last_name&limit=-1", { headers: headers })
      .pipe( (map ( (result: any) => result.data )))
  }
}
