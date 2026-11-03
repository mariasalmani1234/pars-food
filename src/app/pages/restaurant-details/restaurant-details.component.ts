import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  Restaurant
} from '../../models/restaurant.model';

import {
  Food
} from '../../models/food.model';

import {
  Category
} from '../../models/category.model';

import {
  RestaurantService
} from '../../services/restaurant.service';

import {
  FoodService
} from '../../services/food.service';

import {
  CartService
} from '../../services/cart.service';



@Component({

  selector:'app-restaurant-detail',

  standalone:true,

  imports:[
    CommonModule,
    RouterLink
  ],

  templateUrl:
  './restaurant-details.component.html',

  styleUrl:
  './restaurant-details.component.css'

})


export class RestaurantDetailComponent
implements OnInit {



  restaurant?: Restaurant;


  foods: Food[] = [];


  categories: Category[] = [];



  selectedCategoryId:
  number | null = null;



  addedFoodId:
  number | null = null;




  constructor(

    private route: ActivatedRoute,


    private restaurantService:
    RestaurantService,


    public foodService:
    FoodService,


    private cartService:
    CartService

  ){}




  ngOnInit(): void {


    const id = Number(

      this.route
      .snapshot
      .paramMap
      .get('id')

    );



    this.loadCategories();

    this.loadRestaurant(id);


  }






  loadRestaurant(id:number):void {


    this.restaurantService

    .getRestaurantById(id)

    .subscribe({

      next:(restaurant)=>{


        this.restaurant = restaurant;


        this.loadFoods(
          restaurant.id
        );


      },


      error:(error)=>{

        console.error(
          'خطا در دریافت رستوران',
          error
        );

      }


    });


  }






  loadFoods(
    restaurantId:number
  ):void {


    this.foodService

    .getFoodsByRestaurantId(
      restaurantId
    )

    .subscribe({

      next:(foods)=>{


        this.foods = foods;


      },


      error:(error)=>{

        console.error(
          'خطا در دریافت غذاها',
          error
        );

      }

    });


  }





  getCategories(): Category[] {
  
    return this.categories;
  
  }
  





  get filteredFoods(): Food[] {


    if(
      this.selectedCategoryId === null
    ){

      return this.foods;

    }



    return this.foods.filter(

      food =>

      food.categoryId ===
      this.selectedCategoryId

    );


  }






  filterByCategory(
    categoryId:number | null
  ):void {


    this.selectedCategoryId =
    categoryId;


  }







  addToCart(food:Food):void {


    if(
      !food.isAvailable
    ){

      return;

    }



    this.cartService
    .addToCart(food);



    this.addedFoodId =
    food.id;



    setTimeout(()=>{


      if(
        this.addedFoodId === food.id
      ){

        this.addedFoodId = null;

      }


    },1200);



  }







  getQuantity(
    foodId:number
  ):number {


    return this.cartService
    .getFoodQuantity(
      foodId
    );


  }
  loadCategories(): void {

  this.foodService
    .getCategories()
    .subscribe({

      next: (categories) => {

        this.categories = categories;

      },

      error: (error) => {

        console.error(
          'خطا در دریافت دسته بندی‌ها',
          error
        );

      }

    });

}


}