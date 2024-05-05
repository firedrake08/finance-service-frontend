import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/common.service';
import { ManagerService } from 'src/app/core/manager.service';

@Component({
  selector: 'app-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.scss'],
})
export class AllLoansComponent implements OnInit {
  allLoans: any = [];
  loading: boolean = false;
  constructor(public managerSrvc: ManagerService,public commonSrvc:CommonService) {}

  ngOnInit(): void {
    this.getAllLoans();
  }

  getAllLoans() {
    this.loading = true;
    this.managerSrvc.fetchAllLoans().subscribe((res: any) => {
      this.loading = false;
      this.allLoans = this.commonSrvc.updateLoanStatus(res);
      console.log(this.allLoans);
      this.allLoans.sort((a:any,b:any)=>{
        if (a.status === "fresh" && b.status !== "fresh") {
          return -1;
        } else if (a.status !== "fresh" && b.status === "fresh") {
          return 1;
        } else {
          return 0;
        }
      })
    });
  }

  approveLoan(loan: any) {
    this.loading = true;
    this.managerSrvc
      .updateStatus(loan._id, { status: 'approved' })
      .subscribe((res: any) => {
        alert(`Loan for amount ${res.itemPrice} successfully approved`);
        this.getAllLoans();
      });
  }

  rejectLoan(loan: any) {
    this.loading = true;
    this.managerSrvc
      .updateStatus(loan._id, { status: 'rejected' })
      .subscribe((res: any) => {
        alert(`Loan for amount ${res.itemPrice} rejected`);
        this.getAllLoans();
      });
  }

  disburseAmount(loan: any) {
    this.loading = true;
    this.managerSrvc
      .updateStatus(loan._id, { status: 'payment disbursed' })
      .subscribe((res: any) => {
        let loanAmount =
          res.itemPrice - (res.downPayment / 100) * res.itemPrice;
        const monthlyInterestRate = 14 / 12 / 100;
        let installmentsCount = res.tenure * 12;
        const emi = (
          (loanAmount *
            monthlyInterestRate *
            (1 + monthlyInterestRate) ** installmentsCount) /
          ((1 + monthlyInterestRate) ** installmentsCount - 1)
        ).toFixed(2);

        let installments = [];
        for (let i = 0; i < installmentsCount; i++) {
          const baseDate = new Date();
          baseDate.setMonth(baseDate.getMonth() + i + 1);
          baseDate.setDate(1);

          const installmentObject = {
            installmentDueDate: baseDate.getTime(),
            installmentAmount: emi,
            status: 'unpaid',
          };
          installments.push(installmentObject);
        }
        this.managerSrvc
          .setInstallmentsForLoan(loan._id, installments)
          .subscribe((res) => {
            alert(`Amount disbursed`);
            this.getAllLoans();
          });
      });
  }
}
