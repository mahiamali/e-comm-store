import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    if (authService.isAdmin) {
      return true;
    } else {
      router.navigateByUrl('/');
      return false;
    }
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
