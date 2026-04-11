import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const pid = inject(PLATFORM_ID)
  if (isPlatformBrowser(pid)) {
      if (localStorage.getItem("freshToken")) {
     return true;
  }
  else{
    return router.parseUrl("/login")
  }
  }
  else{
    return true;
  }
};
