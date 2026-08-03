import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

    restaurants:Restaurant[]=[
    {
      id:1,
      name:"بیف لاین",
      city:"تهران",
      rate:4.3,
    },
    {
      id:2,
      name:"پیتزا کاخ",
      city:"تهران",
      rate:3.8,
    },
    {
      id:3,
      name:"سوخاری خروس",
      city:"تهران",
      rate:4.1,
    },
  
  ];
  getRestaurants() {
    return this.restaurants;
  }

}
