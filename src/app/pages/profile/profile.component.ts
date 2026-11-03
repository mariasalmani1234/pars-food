import {
  Component,
  OnInit
} from '@angular/core';


import {
  CommonModule
} from '@angular/common';


import {
  Router
} from '@angular/router';


import {
  User
} from '../../models/user.model';


import {
  AuthService
} from '../../services/auth.service';


import {
  OrderService
} from '../../services/order.service';


import {
  Order
} from '../../models/order.model';



@Component({

selector:'app-profile',

standalone:true,

imports:[
CommonModule
],

templateUrl:
'./profile.component.html',

styleUrl:
'./profile.component.css'

})


export class ProfileComponent
implements OnInit {


user?:User;


orders:Order[]=[];



constructor(

private authService:
AuthService,


private orderService:
OrderService,


private router:
Router


){}





ngOnInit(){


this.user =
this.authService
.getCurrentUser()
|| undefined;




if(this.user){


this.orders =

this.orderService
.getOrdersByUserId(
this.user.id
);


}



}






get totalPurchase(){


return this.orders.reduce(

(total,order)=>

total + order.totalPrice,

0

);


}






logout(){


this.authService.logout();


this.router.navigate([

'/login'

]);


}



}