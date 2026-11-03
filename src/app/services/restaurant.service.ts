import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Restaurant
} from '../models/restaurant.model';



@Injectable({
  providedIn: 'root'
})
export class RestaurantService {


  private apiUrl =
    'http://localhost:3000/restaurants';



  constructor(
    private http: HttpClient
  ) {}





  // دریافت همه رستوران‌ها

  getRestaurants():

  Observable<Restaurant[]> {

    return this.http.get<Restaurant[]>(
      this.apiUrl
    );

  }





  // دریافت یک رستوران با id

  getRestaurantById(
    id: number
  ):

  Observable<Restaurant> {


    return this.http.get<Restaurant>(

      `${this.apiUrl}/${id}`

    );

  }





  // ثبت رستوران جدید

  addRestaurant(

    restaurant: Restaurant

  ):

  Observable<Restaurant> {


    return this.http.post<Restaurant>(

      this.apiUrl,

      restaurant

    );

  }





  // ویرایش رستوران

  updateRestaurant(

    id:number,

    restaurant:Restaurant

  ):

  Observable<Restaurant> {


    return this.http.put<Restaurant>(

      `${this.apiUrl}/${id}`,

      restaurant

    );

  }





  // حذف رستوران

  deleteRestaurant(

    id:number

  ):

  Observable<void> {


    return this.http.delete<void>(

      `${this.apiUrl}/${id}`

    );

  }


}