import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/services/auth.service';

export const verificationGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);
  const service = inject(AuthService);
  const router = inject(Router);
  const token = cookie.get("jwt");


  if (token) {
    router.navigate(['/', 'home']);
    return false;
  }
  return true;
};
