import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  imports: [],
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.scss',
})
export class CustomerProfile {
  authService = inject(AuthService)
  router = inject(Router)
  userData: any;

  constructor(){
    this.userData = this.authService.userData;
  }
  
  onEditProfile() {
    // Navigate to profile edit page
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  onSettings() {
    // Navigate to settings
  }
}
