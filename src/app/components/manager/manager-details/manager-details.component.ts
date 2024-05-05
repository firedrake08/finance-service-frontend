import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { CommonService } from 'src/app/core/common.service';
import { ManagerService } from 'src/app/core/manager.service';

@Component({
  selector: 'app-manager-details',
  templateUrl: './manager-details.component.html',
  styleUrls: ['./manager-details.component.scss'],
})
export class ManagerDetailsComponent implements OnInit {
  currentManager: any;
  allLoans: any = [];
  disbursedLoans: any = [];
  freshLoans:any = [];
  totalDisbursedAmount: any;
  repaidLoans: any = [];
  loading: boolean = false;
  constructor(
    public managerSrvc: ManagerService,
    public commonSrvc: CommonService,
    public authSrvc: AuthService
  ) {}

  ngOnInit(): void {
    this.currentManager = this.authSrvc.currentUser;
    this.getAllLoans();
  }

  getAllLoans() {
    this.loading = true;
    this.managerSrvc.fetchAllLoans().subscribe((res: any) => {
      this.loading = false;
      this.freshLoans = res.filter((loan: any) => {
        return loan.status === 'fresh';
      });
      this.disbursedLoans = res.filter((loan: any) => {
        return loan.status === 'payment disbursed';
      });
      this.allLoans = this.commonSrvc.updateLoanStatus(res);
      this.totalDisbursedAmount = this.disbursedLoans.reduce(
        (acc: any, loan: any) => {
          const downPaymentPercent = loan.downPayment / 100;
          const disbursedAmount =
            loan.itemPrice - downPaymentPercent * loan.itemPrice;
          return acc + disbursedAmount;
        },
        0
      );
      this.repaidLoans = this.allLoans.filter((loan: any) => {
        return loan.status === 'completed';
      });
    });
  }
}
