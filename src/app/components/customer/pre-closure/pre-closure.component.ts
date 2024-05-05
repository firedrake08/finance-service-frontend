import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { CustomerService } from 'src/app/core/customer.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-pre-closure',
  templateUrl: './pre-closure.component.html',
  styleUrls: ['./pre-closure.component.scss'],
})
export class PreClosureComponent implements OnInit {
  currentCustomer: any;
  loans: any = [];
  loanToBePreclosed:any = null;
  remainingAmount:any;
  modalRef?: BsModalRef;
  loading: boolean = false;
  constructor(
    public authService: AuthService,
    public customerSrvc: CustomerService,
    public commonSrvc:CommonService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.currentCustomer = this.authService.currentUser;
    this.fetchCustomerLoans();
  }

  fetchCustomerLoans(){
    this.loading = true;
    this.customerSrvc
      .getLoansByCustomerMail(this.currentCustomer.email)
      .subscribe((res: any) => {
        this.loading = false;
        this.loans = this.commonSrvc.updateLoanStatus(res);
      });
  }

  openPrecloseLoanModal(template: TemplateRef<any>,loan:any) {
    this.modalRef = this.modalService.show(template);
    this.loanToBePreclosed = loan;
    this.remainingAmount = this.loanToBePreclosed.installments.reduce((acc:any,installment:any)=>{
      if(installment.status==='unpaid'){
        return acc+parseInt(installment.installmentAmount);
      }
      else{
        return acc;
      }
    },0);
  }

  precloseLoan(){
    this.loading = true;
    this.customerSrvc.precloseLoan(this.loanToBePreclosed._id).subscribe((res)=>{
      this.loading = false;
      alert("Loan successfully preclosed");
      this.closePrecloseLoanModal();
    });
  }

  closePrecloseLoanModal() {
    this.modalRef?.hide();
  }
}
