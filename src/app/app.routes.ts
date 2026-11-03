import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component')
    .then(module => module.HomeComponent) },
  { path: 'restaurants', loadComponent: () => import('./pages/restaurants/restaurants.component')
    .then(module => module.RestaurantsComponent) },
  { path: 'restaurants/:id', loadComponent: () => import('./pages/restaurant-details/restaurant-details.component')
    .then(module => module.RestaurantDetailComponent) },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart.component')
    .then(module => module.CartComponent) },
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component')
    .then(module => module.CheckoutComponent), canActivate: [authGuard] },
  { path: 'login', loadComponent: () => import('./pages/login/login.component')
    .then(module => module.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component')
    .then(module => module.RegisterComponent) },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.component')
    .then(module => module.ProfileComponent), canActivate: [authGuard] },
  { path: 'orders', loadComponent: () => import('./pages/orders/orders.component')
    .then(module => module.OrdersComponent), canActivate: [authGuard] },
  { path: 'restaurant-management', loadComponent: () => import('./pages/restaurant-management/restaurant-management.component')
    .then(module => module.RestaurantManagementComponent), canActivate: [roleGuard('restaurant')] },
  { path: 'admin', loadComponent: () => import('./pages/admin/admin.component')
    .then(module => module.AdminComponent), canActivate: [roleGuard('admin')] },
  { path: '**', redirectTo: '' }
];
