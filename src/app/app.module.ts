import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/login/login.component';
import { AgentDashboardComponent } from './components/agent/agent-dashboard/agent-dashboard.component';
import { CustomerDashboardComponent } from './components/customer/customer-dashboard/customer-dashboard.component';
import { ManagerDashboardComponent } from './components/manager/manager-dashboard/manager-dashboard.component';
import { AgentDetailsComponent } from './components/agent/agent-details/agent-details.component';
import { NewLoanComponent } from './components/agent/new-loan/new-loan.component';
import { LoansComponent } from './components/agent/loans/loans.component';
import { CommissionsComponent } from './components/agent/commissions/commissions.component';
import { ManagerDetailsComponent } from './components/manager/manager-details/manager-details.component';
import { AllLoansComponent } from './components/manager/all-loans/all-loans.component';
import { CustomerDetailsComponent } from './components/customer/customer-details/customer-details.component';
import { CustomerLoansComponent } from './components/customer/customer-loans/customer-loans.component';
import { PreClosureComponent } from './components/customer/pre-closure/pre-closure.component';
import { HypothecationComponent } from './components/customer/hypothecation/hypothecation.component';
import { LoanDetailsComponent } from './components/customer/loan-details/loan-details.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoanInfoComponent } from './components/customer/loan-info/loan-info.component';
import { FreshLoanComponent } from './components/manager/fresh-loan/fresh-loan.component';
import { HomeComponent } from './shared/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgentDashboardComponent,
    CustomerDashboardComponent,
    ManagerDashboardComponent,
    AgentDetailsComponent,
    NewLoanComponent,
    LoansComponent,
    CommissionsComponent,
    ManagerDetailsComponent,
    AllLoansComponent,
    CustomerDetailsComponent,
    CustomerLoansComponent,
    PreClosureComponent,
    HypothecationComponent,
    LoanDetailsComponent,
    LoanInfoComponent,
    FreshLoanComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
