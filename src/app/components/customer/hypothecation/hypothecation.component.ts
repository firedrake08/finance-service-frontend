import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { CommonService } from 'src/app/core/common.service';
import { CustomerService } from 'src/app/core/customer.service';

@Component({
  selector: 'app-hypothecation',
  templateUrl: './hypothecation.component.html',
  styleUrls: ['./hypothecation.component.scss'],
})
export class HypothecationComponent implements OnInit {
  currentCustomer: any;
  loans: any = [];
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
      });
  }

  submitHypothecation() {
    alert('Hypothecation submitted');
  }
}
