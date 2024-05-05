import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.scss'],
})
export class LoanInfoComponent implements OnInit {
  @Input() loan: any;
  installmentAmount: any;
  pendingInstallment: any;
  pendingInstallmentDueIn: any;
  monthsRemaining: any;
  currentUser: any;
  constructor(public router: Router, public authSrvc: AuthService) {}

  ngOnInit(): void {
    this.installmentAmount = this.loan.installments[0].installmentAmount;
    const totalInstallments = this.loan.installments.length;
    let firstUnpaidIndex = 0;

    while (
      firstUnpaidIndex < totalInstallments &&
      this.loan.installments[firstUnpaidIndex].status === 'paid'
    ) {
      firstUnpaidIndex++;
    }

    this.pendingInstallment = this.loan.installments[firstUnpaidIndex];
    const dueDate = this.pendingInstallment.installmentDueDate;
    const today = new Date().getTime();
    this.pendingInstallmentDueIn = Math.trunc(
      (dueDate - today) / (1000 * 60 * 60 * 24)
    );
    let unpaidInstallments = this.loan.installments.filter(
      (installment: any) => {
        return installment.status === 'unpaid';
      }
    );
    this.monthsRemaining = unpaidInstallments.length;
  }

  goToLoanDetails() {
    if (this.authSrvc.currentUser.userType === 'customer') {
      this.router.navigate(['/customer-dashboard/loan-details', this.loan._id]);
    }
  }
}
