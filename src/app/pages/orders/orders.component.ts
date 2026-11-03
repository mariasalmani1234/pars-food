import {
  Component,
  OnInit
} from '@angular/core';

import { RouterLink } from '@angular/router';
import {
  CommonModule
} from '@angular/common';


import {
  Order
} from '../../models/order.model';


import {
  OrderService
} from '../../services/order.service';


import {
  AuthService
} from '../../services/auth.service';



@Component({

  selector:'app-orders',

  standalone:true,

  imports:[
    CommonModule,RouterLink
  ],

  templateUrl:
  './orders.component.html',

  styleUrl:
  './orders.component.css'

})


export class OrdersComponent
implements OnInit {


  orders:Order[] = [];




  constructor(

    private orderService:
      OrderService,


    private authService:
      AuthService


  ){}





  ngOnInit():void {



    const user =

      this.authService
      .getCurrentUser();




    if(user){



      this.orders =

        this.orderService
        .getOrdersByUserId(
          user.id
        );


    }



  }






  getStatusText(
    status:string
  ){



    switch(status){


      case 'pending':

        return 'در انتظار تایید';



      case 'accepted':

        return 'تایید شده';



      case 'preparing':

        return 'در حال آماده‌سازی';



      case 'delivered':

        return 'تحویل داده شده';



      case 'cancelled':

        return 'لغو شده';



      default:

        return 'نامشخص';


    }


  }

}