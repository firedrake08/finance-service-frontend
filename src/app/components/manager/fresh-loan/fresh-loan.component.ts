import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fresh-loan',
  templateUrl: './fresh-loan.component.html',
  styleUrls: ['./fresh-loan.component.scss']
})
export class FreshLoanComponent implements OnInit {
  @Input() loan: any;
  loanAmount:any;
  constructor() { }

  ngOnInit(): void {
    this.loanAmount = this.loan.itemPrice-(this.loan.downPayment/100*this.loan.itemPrice);
  }

}
