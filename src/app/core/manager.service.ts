import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  dbUrl:any = 'https://finance-service-backend-uitzyd2zza-uc.a.run.app';

  constructor(public http:HttpClient) { }

  fetchAllLoans(){
    return this.http.get(`${this.dbUrl}/getAllLoans`);
  }

  updateStatus(id:any,status:any){
    return this.http.patch(`${this.dbUrl}/updateLoanStatus/${id}`,status);
  }

  setInstallmentsForLoan(id:any,installments:any){
    return this.http.patch(`${this.dbUrl}/setInstallmentsById/${id}`,installments);
  }
}
