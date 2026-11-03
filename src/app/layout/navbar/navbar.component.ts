import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from '../../shared/icon.component';
import { AuthNavigationService } from '../../shared/auth-navigation.service';
@Component({selector:'app-navbar',standalone:true,imports:[CommonModule,RouterLink,RouterLinkActive,IconComponent],templateUrl:'./navbar.component.html',styleUrl:'./navbar.component.css'})
export class NavbarComponent {
  constructor(public cartService:CartService,public authService:AuthService,private router:Router,public authNavigation:AuthNavigationService){}
  logout():void{this.authService.logout();void this.router.navigate(['/login']);}
}
