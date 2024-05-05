import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/core/agent.service';
import { AuthService } from 'src/app/core/auth.service';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss'],
})
export class AgentDetailsComponent implements OnInit {
  currentAgent: any;
  loans: any = [];
  disbursedLoans: any = [];
  totalCommission: any;
  uniqueCustomers: any = [];
  loading: boolean = false;
  freshLoans:any = [];
  ongoingLoans: any = [];
  constructor(
    public authService: AuthService,
    public agentSrvc: AgentService,
    public commonSrvc: CommonService
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

        this.freshLoans = res.filter((loan: any) => {
          return loan.status === 'fresh';
        });
        this.disbursedLoans = res.filter((loan: any) => {
          return loan.status === 'payment disbursed';
        });

        this.ongoingLoans = this.commonSrvc.updateLoanStatus(res);
        this.ongoingLoans = res.filter((loan: any) => {
          return loan.status !== 'completed' && loan.emiStarted;
        });

        const uniqueEmails = new Set();
        this.disbursedLoans.forEach((loan: any) => {
          uniqueEmails.add(loan.customerEmail);
        });

        this.uniqueCustomers = [...uniqueEmails].map((email) => ({ email }));

        this.loans = this.disbursedLoans.map((loan: any) => {
          let commissionedLoan = { ...loan };
          let loanAmount =
            commissionedLoan.itemPrice -
            (commissionedLoan.downPayment / 100) * commissionedLoan.itemPrice;
          commissionedLoan.commission = loanAmount * 0.01;
          return commissionedLoan;
        });
        this.totalCommission = this.loans.reduce((acc: any, loan: any) => {
          return acc + loan.commission;
        }, 0);
      });
  }
}
