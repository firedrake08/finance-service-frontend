import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { CustomerService } from 'src/app/core/customer.service';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  currentCustomer: any;
  loans: any = [];
  completedLoans: any = [];
  ongoingLoans: any = [];
  loading: boolean = false;
  constructor(
    public authService: AuthService,
    public customerSrvc: CustomerService,
    public commonSrvc: CommonService
  ) {}

  ngOnInit(): void {
    this.currentCustomer = this.authService.currentUser;
    this.fetchCustomerLoans();
  }

  fetchCustomerLoans() {
    this.loading = true;
    this.customerSrvc
      .getLoansByCustomerMail(this.currentCustomer.email)
      .subscribe((res: any) => {
        this.loading = false;
        this.loans = this.commonSrvc.updateLoanStatus(res);
        this.ongoingLoans = this.loans.filter((loan: any) => {
          return loan.status !== 'completed' && loan.emiStarted;
        });
        this.completedLoans = this.loans.filter((loan: any) => {
          return loan.status === 'completed';
        });
      });
  }
}
