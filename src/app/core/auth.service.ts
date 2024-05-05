import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dbUrl:any = 'http://localhost:4600';
  currentUser:any|null = null;
  constructor(public http:HttpClient) {}

  userLogin(user:any){
    return this.http.post(`${this.dbUrl}/getUser`,user);
  }

  fetchCustomerByEmail(email:any){
    return this.http.get(`${this.dbUrl}/getUserByEmail/${email}`);
  }

  createPasswordForCustomer(email:any,password:any){
    return this.http.patch(`${this.dbUrl}/createPassword/${email}`,password);
  }
}
