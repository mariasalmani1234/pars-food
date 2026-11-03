import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  RestaurantService
} from '../../services/restaurant.service';

import {
  Restaurant
} from '../../models/restaurant.model';

import {
  RestaurantCardComponent
} from '../../shared/restaurant-card/restaurant-card.component';


@Component({

  selector:'app-restaurants',

  standalone:true,

  imports:[
    CommonModule,
    FormsModule,
    RestaurantCardComponent
  ],

  templateUrl:
  './restaurants.component.html',

  styleUrl:
  './restaurants.component.css'

})


export class RestaurantsComponent
implements OnInit {


  restaurants:Restaurant[] = [];

  filteredRestaurants:Restaurant[] = [];


  searchText = '';

  onlyOpen = false;



  constructor(
    private restaurantService:RestaurantService
  ){}



  ngOnInit():void {

    this.loadRestaurants();

  }




  loadRestaurants():void {


    this.restaurantService
    .getRestaurants()
    .subscribe({

      next:(data)=>{

        this.restaurants=data;

        this.filteredRestaurants=data;

      }

    });


  }





  filterRestaurants():void {


    this.filteredRestaurants =

    this.restaurants.filter(

      restaurant => {


        const search =

        restaurant.name

        .includes(
          this.searchText
        );



        const open =

        this.onlyOpen

        ?

        restaurant.isOpen

        :

        true;



        return search && open;


      }

    );


  }



}