import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  updateLoanStatus(loans: any) {
    loans.forEach((loan: any) => {
      if (loan.emiStarted) {
        const totalInstallments = loan.installments.length;
        let firstUnpaidIndex = 0;

        while (
          firstUnpaidIndex < totalInstallments &&
          loan.installments[firstUnpaidIndex].status === 'paid'
        ) {
          firstUnpaidIndex++;
        }

        if (firstUnpaidIndex === totalInstallments) {
          loan.status = 'completed';
        } else {
          const firstUnpaidInstallment = loan.installments[firstUnpaidIndex];
          const dueDate = firstUnpaidInstallment.installmentDueDate;
          const today = new Date().getTime();

          if (dueDate < today) {
            loan.status = `${
              firstUnpaidIndex + 1
            }/${totalInstallments} overdue`;
          } else {
            if ((dueDate - today) / (1000 * 60 * 60 * 24) < 30) {
              loan.status = `${
                firstUnpaidIndex + 1
              }/${totalInstallments} pending`;
            } else {
              loan.status = `${firstUnpaidIndex}/${totalInstallments} done`;
            }
          }
        }
      }
    });
    return loans;
  }
}
