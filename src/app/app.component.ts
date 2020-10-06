import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { faTractor, faWarehouse } from '@fortawesome/pro-duotone-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  faTractor = faTractor;
  faWarehouse = faWarehouse;
  
  title = 'info-collector';
  hasToken: boolean;

  constructor(public authService: AuthService,
    private router: Router){
  }

  signOut(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }



  




}
