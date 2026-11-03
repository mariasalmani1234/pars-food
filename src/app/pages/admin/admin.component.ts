import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  UserService
} from '../../services/user.service';

import {
  RestaurantService
} from '../../services/restaurant.service';

import {
  OrderService
} from '../../services/order.service';



@Component({

  selector:'app-admin',

  standalone:true,

  imports:[
    CommonModule
  ],

  templateUrl:
  './admin.component.html',

  styleUrl:
  './admin.component.css'

})


export class AdminComponent
implements OnInit {



usersCount=0;


restaurantsCount=0;


ordersCount=0;


totalSales=0;



constructor(

private userService:UserService,

private restaurantService:RestaurantService,

private orderService:OrderService

){}





ngOnInit(){


this.loadData();


}






loadData(){



this.userService
.getUsers()
.subscribe(users=>{


this.usersCount =
users.length;


});





this.restaurantService
.getRestaurants()
.subscribe(restaurants=>{


this.restaurantsCount =
restaurants.length;


});





const orders =

this.orderService
.getOrders();



this.ordersCount =
orders.length;



this.totalSales =

orders.reduce(

(sum,order)=>

sum + order.totalPrice

,0);



}




}