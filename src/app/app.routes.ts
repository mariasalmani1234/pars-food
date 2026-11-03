import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';

import { RestaurantDetailComponent } from './pages/restaurant-details/restaurant-details.component'; 

import { roleGuard } from './guards/role.guard';
import { RestaurantsComponent } 
from './pages/restaurants/restaurants.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CartComponent } 
from './pages/cart/cart.component';

import { CheckoutComponent } 
from './pages/checkout/checkout.component';

import { OrdersComponent } 
from './pages/orders/orders.component';

import { RestaurantManagementComponent } 
from './pages/restaurant-management/restaurant-management.component';

import { authGuard } from './guards/auth.guard'; 



export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },


  {
    path: 'restaurants',
    component: RestaurantsComponent
  },


  {
    path: 'restaurants/:id',
    component: RestaurantDetailComponent
  },


  {
    path: 'cart',
    component: CartComponent
  },


  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard]
  },


  {
    path: 'login',
    component: LoginComponent
  },


  {
    path: 'register',
    component: RegisterComponent
  },


  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },


  {
  path:'orders',
  
  component:
  OrdersComponent,
  
  canActivate:[
  authGuard
  ]
  
  },


  {
  path:'restaurant-management',
    
  component:
  RestaurantManagementComponent,
    
  canActivate:[
  roleGuard('restaurant')
  ]
    
  },
    

  {
  path:'admin',
  
  component:AdminComponent,
  
  canActivate:[
  roleGuard('admin')
  ]
  
  },

  {
    path: '**',
    redirectTo: ''
  }

];