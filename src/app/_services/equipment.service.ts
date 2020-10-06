import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Asset } from '../_model/asset';


@Injectable({
    providedIn: 'root'
  })
  export class EquipmentService {
      
    private _baseUrl = `${environment.apiUrl}`; 
  
    constructor(private http: HttpClient, public authService: AuthService) {}

    public getEquipments(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.authService.currentUserValue?.token
      })
      return this.http.get<any>( this._baseUrl + "/items/equipment?fields=*.*", { headers: headers });
    }
  
  
    // Only authorized users can post links, add bearer token if available
    public postEquipment(eq: any){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.authService.currentUserValue?.token
      })
      return this.http.post<any>( this._baseUrl, eq );
    }

        // Only authorized users can post links, add bearer token if available
    public postAsset(asset: any){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.authService.currentUserValue?.token
      })
      return this.http.post<any>( this._baseUrl + "/items/asset_information", asset );
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
  