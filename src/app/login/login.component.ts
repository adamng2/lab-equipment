import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service'
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  hasErrors: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.form = this.fb.group({
      email: ['',  [
        Validators.required,
        Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.hasErrors = false;
    this.errorMessage = '';

    const val = this.form.value;
    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          (res) => {
            //console.log(res);
            this.router.navigateByUrl('/');
          },
          error => {
            this.handleError(error);
          }
        );
    }
  }

  handleError(error: any) {
    this.form.disable();
    this.hasErrors = true;
 
    if (error.status == 404) {
      //user not found
      this.errorMessage = "The email/password doesn't match any account!"
    } else {
      // other errors
      this.errorMessage = "Unknown error"
      console.log( error);
    }

    this.form.reset();
    this.form.enable();

  }
}

