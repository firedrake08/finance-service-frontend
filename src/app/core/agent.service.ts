import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  dbUrl:any = 'http://localhost:4600';

  constructor(public http:HttpClient) { }

  addNewCustomer(customer:any){
    return this.http.post(`${this.dbUrl}/addUser`,customer);
  }

  addNewLoan(loan:any){
    return this.http.post(`${this.dbUrl}/addLoan`,loan);
  }

  getLoansByAgentMail(mail:any){
    return this.http.get(`${this.dbUrl}/getAllLoansByAgentMail/${mail}`);
  }

  updateStatus(id:any,status:any){
    return this.http.patch(`${this.dbUrl}/updateLoanStatus/${id}`,status);
  }

  startLoanEmi(id:any){
    return this.http.patch(`${this.dbUrl}/startEmi/${id}`,{emiStarted:true});
  }
}
