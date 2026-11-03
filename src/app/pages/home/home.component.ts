import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import {
  Restaurant
} from '../../models/restaurant.model';

import {
  RestaurantService
} from '../../services/restaurant.service';

import {
  CategorySectionComponent
} from '../../shared/components/category-section/category-section.component';

import { RestaurantCardComponent } from '../../shared/restaurant-card/restaurant-card.component';


@Component({

  selector: 'app-home',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    CategorySectionComponent,
    RestaurantCardComponent
  ],

  templateUrl:
    './home.component.html',

  styleUrl:
    './home.component.css'

})


export class HomeComponent implements OnInit {


  restaurants: Restaurant[] = [];


  constructor(
    private restaurantService: RestaurantService
  ) {}



  ngOnInit(): void {

    this.loadRestaurants();

  }



  loadRestaurants(): void {


    this.restaurantService
      .getRestaurants()
      .subscribe({

        next:(restaurants)=>{

          this.restaurants = restaurants;

        },


        error:(error)=>{

          console.error(
            'خطا در دریافت رستوران‌ها',
            error
          );

        }


      });


  }


}