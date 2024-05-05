import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  dbUrl:any = 'http://localhost:4600';

  constructor(public http:HttpClient) { }

  getLoansByCustomerMail(mail:any){
    return this.http.get(`${this.dbUrl}/getAllLoansByCustomerEmail/${mail}`);
  }

  getLoanById(id:any){
    return this.http.get(`${this.dbUrl}/getLoanById/${id}`);
  }

  payEmi(id:any,emi:any){
    return this.http.patch(`${this.dbUrl}/updateEmi/${id}/${emi.installmentDueDate}`,emi);
  }

  precloseLoan(id:any){
    return this.http.patch(`${this.dbUrl}/updateAllEmis/${id}`,{status:"paid"});
  }
}
