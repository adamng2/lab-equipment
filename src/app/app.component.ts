import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { faWarehouse } from '@fortawesome/pro-duotone-svg-icons';
import { faSearch, faPlus, faUser, faHome, faListUl, faBars, faPlusCircle } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Icons
  faUser = faUser;
  faPlus = faPlus;
  faSearch = faSearch;
  faWarehouse = faWarehouse;
  faBars = faBars;
  faHome = faHome;
  faListUl = faListUl;
  faPlusCircle = faPlusCircle;
  
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
