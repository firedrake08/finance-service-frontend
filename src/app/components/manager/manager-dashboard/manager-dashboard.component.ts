import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss'],
})
export class ManagerDashboardComponent implements OnInit {
  currentManager: any;
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    if (this.authService.currentUser) {
      this.currentManager = this.authService.currentUser;
    } else {
      this.authService.currentUser = JSON.parse(
        window.localStorage.getItem('currentUser') as string
      );
      this.currentManager = this.authService.currentUser;
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
