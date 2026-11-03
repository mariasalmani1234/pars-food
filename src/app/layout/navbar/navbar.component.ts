import {
  Component
} from '@angular/core';


import {
  RouterLink,
  RouterLinkActive,
  Router
} from '@angular/router';


import {
  CommonModule
} from '@angular/common';


import {
  CartService
} from '../../services/cart.service';


import {
  AuthService
} from '../../services/auth.service';



@Component({

  selector:'app-navbar',

  standalone:true,

  imports:[
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl:
  './navbar.component.html',

  styleUrl:
  './navbar.component.css'

})


export class NavbarComponent {



constructor(

public cartService:CartService,

public authService:AuthService,

private router:Router

){}




logout(){

this.authService.logout();


this.router.navigate([

'/login'

]);


}




}