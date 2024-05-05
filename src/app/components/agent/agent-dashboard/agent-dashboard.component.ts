import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.scss'],
})
export class AgentDashboardComponent implements OnInit {
  currentAgent: any;
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    if (this.authService.currentUser) {
      this.currentAgent = this.authService.currentUser;
    } else {
      this.authService.currentUser = JSON.parse(
        window.localStorage.getItem('currentUser') as string
      );
      this.currentAgent = this.authService.currentUser;
    }
  }

  logout() {
    let logoutConfirm = window.confirm('Are you sure you want to logout?');
    if (logoutConfirm) {
      this.authService.currentUser = null;
      window.localStorage.clear();
      this.router.navigate(['']);
    }
  }
}
