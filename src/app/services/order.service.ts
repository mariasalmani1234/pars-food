import { Injectable } from '@angular/core';

import {
  Order
} from '../models/order.model';



@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private storageKey =
    'pars-food-orders';



  private orders: Order[] =
    this.loadOrders();




  createOrder(
    order: Order
  ): void {


    this.orders.push(order);


    this.saveOrders();

  }





  getOrders():

  Order[] {

    return this.orders;

  }





  getOrdersByUserId(
    userId:number
  ):


  Order[] {


    return this.orders.filter(

      order =>

        order.userId === userId

    );


  }






  private saveOrders(){

    localStorage.setItem(

      this.storageKey,

      JSON.stringify(
        this.orders
      )

    );

  }






  private loadOrders():

  Order[] {


    const data =

      localStorage.getItem(
        this.storageKey
      );



    if(!data){

      return [];

    }



    return JSON.parse(data);


  }
  getOrdersByRestaurantId(
  restaurantId:number
): Order[] {


return this.orders.filter(order =>

  order.items.some(item =>

    item.food.restaurantId === restaurantId

  )

);


}


}