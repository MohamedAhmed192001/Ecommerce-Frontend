import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (authService.getUserRole() === "Admin")
    return true;

  // ✅ Allow access to PlaceOrder even if not Admin
  if (state.url.includes('place-order')) {
    return true;
  }

  toastr.error('Access denied. Admins only');
  router.navigate(["/login"]);
  return false;
};
