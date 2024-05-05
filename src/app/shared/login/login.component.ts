import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  firstTimeLoginForm: FormGroup;
  firstTimePasswordForm: FormGroup;
  isFirstTimeLogin:boolean = false;
  firstTimePassword:boolean = false;
  firstTimeCustomer:any = null;
  loading:boolean = false;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });

    this.firstTimeLoginForm = this.fb.group({
      email: ['']
    });

    this.firstTimePasswordForm = this.fb.group({
      password: ['']
    });
  }

  ngOnInit(): void {}

  login() {
    this.loading = true;
    this.authService.userLogin(this.loginForm.value).subscribe((res: any) => {
    this.loading = false;
      if (res.length) {
        window.localStorage.setItem('currentUser', JSON.stringify(res[0]));
        this.authService.currentUser = res[0];
        if (res[0].userType === 'manager') {
          this.router.navigate(['/manager-dashboard']);
        }
        if (res[0].userType === 'agent') {
          this.router.navigate(['/agent-dashboard']);
        }
        if (res[0].userType === 'customer') {
          this.router.navigate(['/customer-dashboard']);
        }
      } else {
        alert('Invalid credentials');
      }
    });
  }

  toggleFirstTimeLogin(){
    this.isFirstTimeLogin = !this.isFirstTimeLogin;
    this.loginForm.reset();
    this.firstTimeLoginForm.reset();
  }

  firstTimeLogin(){
    this.authService.fetchCustomerByEmail(this.firstTimeLoginForm.value.email).subscribe((res:any)=>{
      if(res.length){
        alert('login successful');
        if(!res[0].password){
          this.firstTimePassword = true;
          this.firstTimeCustomer = res[0];
          this.firstTimeLoginForm.reset();
        }
        else{
          alert("Customer already registered");
          this.isFirstTimeLogin = this.firstTimePassword = false;
        }
      }
      else{
        alert("Invalid credentials")
      }
    })
  }

  createPassword(){
    this.authService.createPasswordForCustomer(this.firstTimeCustomer.email,this.firstTimePasswordForm.value).subscribe((res)=>{
      alert('password added successfully');
      this.isFirstTimeLogin = this.firstTimePassword = false;
      this.firstTimePasswordForm.reset();
      this.router.navigate(['']);
    })
  }
}
