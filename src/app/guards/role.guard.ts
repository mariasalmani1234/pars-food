import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

export const roleGuard = (role: UserRole): CanActivateFn => (_route, state) => {
  const user = inject(AuthService).getCurrentUser();
  const router = inject(Router);
  if (!user) return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  if (user.role === role || (role === 'restaurant' && user.role === 'admin')) return true;
  return router.createUrlTree(['/']);
};
