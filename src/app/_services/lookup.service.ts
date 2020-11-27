import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

// TODO: change any to actual department model
@Injectable({
  providedIn: 'root',
})
export class LookupService {
  private _baseUrl = `${environment.apiUrl}`; 

  constructor(private http: HttpClient, public authService: AuthService) {}

  public getDepartments(lang: string = "en"): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.currentUserValue?.token
    })

    return this.http.get<any[]>
      ( this._baseUrl + "/items/department_translations?fields=department,name&filter[language]=en", { headers: headers })
      .pipe( (map ( (result: any) => result.data )))
  }

  public getManufacturers(lang: string = "en"): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.currentUserValue?.token
    })

    return this.http.get<any[]>
      ( this._baseUrl + "/items/manufacturer_translations?fields=manufacturer,name&filter[language]=en", { headers: headers })
      .pipe( (map ( (result: any) => result.data )))
  }
}
