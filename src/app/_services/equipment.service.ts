import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Asset } from '../_model/asset';
import { Equipment } from '../_model/equipment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class EquipmentService {
      
    private _baseUrl = `${environment.apiUrl}`; 
  
    constructor(private http: HttpClient, public authService: AuthService) {}

    public getEquipments(): Observable<Equipment[]> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.authService.currentUserValue?.token
      })

      return this.http.get<Equipment[]>
        ( this._baseUrl + "/items/equipment?fields=*.*&limit=-1", { headers: headers })
        .pipe( (map ( (result: any) => result.data )))
    }

    public getEquipment(id: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.authService.currentUserValue?.token
      })
      return this.http.get<any>( this._baseUrl + "/items/equipment/" + id + '?fields=*.*', { headers: headers })
      .pipe( (map ( (result: any) => result.data )));
    }

    public getEquipmentRevisions(id: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.authService.currentUserValue?.token
      })
      return this.http.get<any>( this._baseUrl + "/items/equipment/" + id + '/revisions?fields=*.*', { headers: headers })
      .pipe( (map ( (result: any) => result.data )));
    }

  
  
    // Only authorized users can post links, add bearer token if available
    public saveEquipment(eq: any, existingId: number){

      const endPoint = this._baseUrl + "/items/equipment";
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.authService.currentUserValue?.token
      })
      if (existingId == -1){
        console.warn("Adding...");
        return this.http.post<any>( endPoint, eq );
      }
      else{
        console.warn("Patching...");
        return this.http.patch( endPoint + "/" + existingId, eq);
      }
    }


    public getCollectionFields( collectionName: string ){
      const url = `${environment.apiUrl}/fields/` + collectionName;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.authService.currentUserValue?.token
      })
      return this.http.get<any>( url, { headers: headers });
    }

    // public updateShipment(id: number, shipment: any){
    //   // public call, no token needed
    //   return this.http.patch<any>( this._baseUrl + "/" + id, shipment)
    // }
  
  
  
  
  
  }
  