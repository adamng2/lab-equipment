import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private _baseUrl = `${environment.apiUrl}/auth/authenticate`;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post<any>(this._baseUrl, { email, password })
        .pipe(map(data => {
            console.log( data );
            let user: User = new User(data);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public isLoggedIn() {
    // Check for present of user and that their token is not expired
    console.log("current user" + this.currentUserValue);
    const helper = new JwtHelperService();
    if( this.currentUserValue && 
      !helper.isTokenExpired(this.currentUserValue.token)){
      return true;
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }


}