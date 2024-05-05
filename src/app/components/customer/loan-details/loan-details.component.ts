import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/core/customer.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss'],
})
export class LoanDetailsComponent implements OnInit {
  currentLoan: any;
  firstUnpaidIndex:any;
  loading: boolean = false;
  constructor(
    public ar: ActivatedRoute,
    public customerSrvc: CustomerService
  ) {}

  ngOnInit(): void {
    this.fetchLoanById();
  }

  fetchLoanById(){
    this.loading = true;
    this.ar.params.subscribe((res) => {
      this.customerSrvc.getLoanById(res.id).subscribe((res: any) => {
        this.loading = false;
        this.currentLoan = res[0];
        console.log(this.currentLoan);
        this.getFirstUnpaidIndex();
      });
    });
  }

  getFirstUnpaidIndex() {
    const totalInstallments = this.currentLoan.installments.length;
    this.firstUnpaidIndex = 0;
    while (
      this.firstUnpaidIndex < totalInstallments &&
      this.currentLoan.installments[this.firstUnpaidIndex].status === 'paid'
    ) {
      this.firstUnpaidIndex++;
    }
  }

  payEmi(emi:any){
    this.loading = true;
    let updatedEmi = {...emi,status:"paid",paymentDate:new Date().getTime()};
    this.customerSrvc.payEmi(this.currentLoan._id,updatedEmi).subscribe((res)=>{
      this.loading = false;
      this.fetchLoanById();
    })
  }
}
