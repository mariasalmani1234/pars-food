import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';


import {
  Observable
} from 'rxjs';


import {
  Food
} from '../models/food.model';


import {
  Category
} from '../models/category.model';



@Injectable({
  providedIn: 'root'
})
export class FoodService {


  private foodApi =
    'http://localhost:3000/foods';


  private categoryApi =
    'http://localhost:3000/categories';




  constructor(
    private http: HttpClient
  ) {}






  getFoods():

  Observable<Food[]> {

    return this.http.get<Food[]>(
      this.foodApi
    );

  }






  getFoodsByRestaurantId(

    restaurantId:number

  ):

  Observable<Food[]> {


    return this.http.get<Food[]>(

      `${this.foodApi}?restaurantId=${restaurantId}`

    );


  }






  getFoodById(

    id:number

  ):

  Observable<Food> {


    return this.http.get<Food>(

      `${this.foodApi}/${id}`

    );


  }






  addFood(

    food:Omit<Food, 'id'>

  ):

  Observable<Food> {


    return this.http.post<Food>(

      this.foodApi,

      food

    );


  }







  updateFood(

    id:number,

    food:Food

  ):

  Observable<Food> {


    return this.http.put<Food>(

      `${this.foodApi}/${id}`,

      food

    );


  }







  deleteFood(

    id:number

  ):

  Observable<void> {


    return this.http.delete<void>(

      `${this.foodApi}/${id}`

    );


  }







  getCategories():

  Observable<Category[]> {


    return this.http.get<Category[]>(

      this.categoryApi

    );


  }





  getCategoryName(
    categoryId:number
  ){

    return '';

  }



}