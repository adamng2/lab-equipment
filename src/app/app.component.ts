import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { faWarehouse, faBars } from '@fortawesome/pro-duotone-svg-icons';
import { faSearch, faPlus, faUser } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  faUser = faUser;
  faPlus = faPlus;
  faSearch = faSearch;
  faWarehouse = faWarehouse;
  faBars = faBars;
  
  title = 'lab-equipment';
  hasToken: boolean;

  constructor(public authService: AuthService,
    private router: Router){
  }

  signOut(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }



  




}