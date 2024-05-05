import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { ManagerDashboardComponent } from './components/manager/manager-dashboard/manager-dashboard.component';
import { AgentDashboardComponent } from './components/agent/agent-dashboard/agent-dashboard.component';
import { CustomerDashboardComponent } from './components/customer/customer-dashboard/customer-dashboard.component';
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
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"manager-dashboard",
    component:ManagerDashboardComponent,
    children:[
      {
        path:"",
        component:ManagerDetailsComponent
      },
      {
        path:"manager-details",
        redirectTo:""
      },
      {
        path:"all-loans",
        component:AllLoansComponent
      },
    ]
  },
  {
    path:"agent-dashboard",
    component:AgentDashboardComponent,
    children:[
      {
        path:"",
        component:AgentDetailsComponent
      },
      {
        path:"agent-details",
        redirectTo:""
      },
      {
        path:"new-loan",
        component:NewLoanComponent
      },
      {
        path:"loans",
        component:LoansComponent
      },
      {
        path:"commissions",
        component:CommissionsComponent
      }
    ]
  },
  {
    path:"customer-dashboard",
    component:CustomerDashboardComponent,
    children:[
      {
        path:"",
        component:CustomerDetailsComponent
      },
      {
        path:"customer-details",
        redirectTo:""
      },
      {
        path:"loans",
        component:CustomerLoansComponent
      },
      {
        path:"loan-details/:id",
        component:LoanDetailsComponent
      },
      {
        path:"preclosure",
        component:PreClosureComponent
      },
      {
        path:"hypothecation",
        component:HypothecationComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
