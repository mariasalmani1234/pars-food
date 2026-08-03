import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RestaurantCardComponent } from './shared/restaurant-card/restaurant-card.component';


export const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
  },
  {
    path: 'restaurants',
    component: RestaurantCardComponent,
  }
];
