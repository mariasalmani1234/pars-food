import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  CartService
} from '../../services/cart.service';

import {
  OrderService
} from '../../services/order.service';

import {
  AuthService
} from '../../services/auth.service';

import {
  Order
} from '../../models/order.model';



@Component({

  selector:'app-checkout',

  standalone:true,

  imports:[
    CommonModule,
    FormsModule
  ],

  templateUrl:
  './checkout.component.html',

  styleUrl:
  './checkout.component.css'

})


export class CheckoutComponent {



  address = '';

  phone = '';

  message = '';




  constructor(

    public cartService:
    CartService,


    private orderService:
    OrderService,


    private authService:
    AuthService,


    private router:
    Router

  ){}





  submitOrder():void {


    const user =
    this.authService
    .getCurrentUser();



    if(!user){

      this.router.navigate([
        '/login'
      ]);

      return;

    }





    const order:Order = {


      id:
      Date.now(),



      userId:
      user.id,



      items:
      this.cartService
      .getItems(),



      totalPrice:
      this.cartService
      .getTotalPrice(),



      address:
      this.address,



      phone:
      this.phone,



      status:
      'pending',



      createdAt:
      new Date()
      .toISOString()


    };





      this.orderService
      .createOrder(order);
      
      
      this.cartService
      .clear();
      
      
      this.message =
      'سفارش شما با موفقیت ثبت شد';
      
      
      setTimeout(()=>{
      
        this.router.navigate([
          '/orders'
        ]);
      
      },1000);





      error:(error:any)=>{


        console.error(
          error
        );


        this.message =
        'ثبت سفارش با خطا مواجه شد';


      }


    


  }



}