import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/core/agent.service';
import { AuthService } from 'src/app/core/auth.service';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss'],
})
export class LoansComponent implements OnInit {
  currentAgent: any;
  loans: any = [];
  loading: boolean = false;
  constructor(
    public authService: AuthService,
    public agentSrvc: AgentService,
    public commonSrvc:CommonService
  ) {}

  ngOnInit(): void {
    this.currentAgent = this.authService.currentUser;
    this.fetchAgentLoans();
  }

  fetchAgentLoans() {
    this.loading = true;
    this.agentSrvc
      .getLoansByAgentMail(this.currentAgent.email)
      .subscribe((res: any) => {
        this.loading = false;
        this.loans = this.commonSrvc.updateLoanStatus(res);
      });
  }

  updateStatus(loan: any) {
    this.loading = true;
    this.agentSrvc
      .updateStatus(loan._id, { status: 'downpayment done' })
      .subscribe((res: any) => {
        this.loading = false;
        alert(`Downpayment status updated for loan amount ${res.itemPrice}`);
        this.fetchAgentLoans();
      });
  }

  startEmi(loan: any) {
    this.loading = true;
    this.agentSrvc.startLoanEmi(loan._id).subscribe((res)=>{
      alert("EMI started");
      this.fetchAgentLoans();
    })
  }

}
