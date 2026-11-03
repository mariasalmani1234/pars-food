import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { CategorySectionComponent } from '../../shared/components/category-section/category-section.component';
import { RestaurantCardComponent } from '../../shared/restaurant-card/restaurant-card.component';
import { HomeHeroComponent } from './home-hero.component';
import { IconComponent } from '../../shared/icon.component';
@Component({selector:'app-home',standalone:true,imports:[CommonModule,RouterLink,CategorySectionComponent,RestaurantCardComponent,HomeHeroComponent,IconComponent],templateUrl:'./home.component.html',styleUrl:'./home.component.css'})
export class HomeComponent implements OnInit {
  restaurants:Restaurant[]=[];loading=false;errorMessage='';
  constructor(private restaurantService:RestaurantService){}
  ngOnInit():void{this.loadRestaurants();}
  loadRestaurants():void{
    this.loading=true;this.errorMessage='';
    this.restaurantService.getRestaurants().subscribe({
      next:restaurants=>{this.restaurants=restaurants;this.loading=false;},
      error:()=>{this.loading=false;this.errorMessage='دریافت رستوران‌ها انجام نشد.';}
    });
  }
  get openCount():number{return this.restaurants.filter(restaurant=>restaurant.isOpen).length;}
}
