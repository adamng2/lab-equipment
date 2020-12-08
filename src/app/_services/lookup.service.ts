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

  constructor(private http: HttpClient, public authService: AuthService) { }

  public getCollection(collection: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.currentUserValue?.token
    })

    return this.http.get<any[]>
      (this._baseUrl + "/collections/" + collection, { headers: headers })
      .pipe((map((result: any) => result.data)))
  }

  public getLookup(collection_name: string, id?: number | string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.currentUserValue?.token
    })
    let url: string;
    if (id) {
      url = this._baseUrl + "/items/" + collection_name + "/" + id + "?fields=*.*"
    } else {
      url = this._baseUrl + "/items/" + collection_name + "?fields=*.*"
    }

    return this.http.get<any[]>
      (url, { headers: headers })
      .pipe((map((result: any) => result.data)))
  }

  public getDepartments(lang: string = "en"): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.currentUserValue?.token
    })

    return this.http.get<any[]>
      (this._baseUrl + "/items/department_translations?fields=department,name,acronym&filter[language]=en", { headers: headers })
      .pipe((map((result: any) => result.data)))
  }

  public getProducers(lang: string = "en"): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.currentUserValue?.token
    })

    return this.http.get<any[]>
      (this._baseUrl + "/items/producer_translations?fields=producer,name&filter[language]=en", { headers: headers })
      .pipe((map((result: any) => result.data)))
  }

  public saveLookup(collection_name: string, data: any[], id: string | number): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.authService.currentUserValue?.token,
    });
    let endPoint: string = '';
    if (id != -1) {
      endPoint = this._baseUrl + '/items/' + collection_name + '/' + id + '?fields=*.*';
      return this.http.patch<any>(endPoint, data);
    } else {
      endPoint = this._baseUrl + '/items/' + collection_name + '?fields=*.*';
      return this.http.post<any>(endPoint, data);
    }

  }

}
