import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UtilService } from '../shared/util/util.service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);
  const util = inject(UtilService)
  const token = cookie.get("jwt")
  const router = inject(Router);
  const resp = {
    message: "Please sign in to access",
    statusCode: 0
  }


  if (!token) {
    util.processResponse(resp)
    router.navigate(["/auth"]);
    return false;
  }
  return true;
};

