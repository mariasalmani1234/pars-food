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
  OrderService
} from '../../services/order.service';

import {
  FoodService
} from '../../services/food.service';


import {
  Restaurant
} from '../../models/restaurant.model';


import {
  Food
} from '../../models/food.model';



@Component({

  selector:'app-restaurant-management',

  standalone:true,

  imports:[

    CommonModule,

    FormsModule

  ],

  templateUrl:
  './restaurant-management.component.html',

  styleUrl:
  './restaurant-management.component.css'

})
 

export class RestaurantManagementComponent
implements OnInit {


totalFoods = 0;

restaurantOrders = 0;

totalSales = 0;

restaurantRate = 4.8;


  restaurants:Restaurant[] = [];

  foods:Food[] = [];


  selectedRestaurantId:
  number | null = null;



  loading = false;

  saving = false;



  errorMessage = '';

  successMessage = '';



  editingFoodId:
  number | null = null;



  foodName = '';

  foodDescription = '';

  foodPrice:
  number | null = null;


  foodImage = '';


  foodCategoryId:
  number | null = null;






   constructor(
  
    private restaurantService:
      RestaurantService,
  
  
    private foodService:
      FoodService,
  
  
    private orderService:
      OrderService
  
  ){}
  




  ngOnInit():void{

    this.loadRestaurants();

  }







  loadRestaurants():void{


    this.loading = true;



    this.restaurantService
    .getRestaurants()
    .subscribe({

      next:(restaurants)=>{


        this.restaurants =
        restaurants;


        this.loading = false;


      },


      error:(error)=>{


        console.error(error);


        this.errorMessage =
        'دریافت رستوران‌ها انجام نشد';


        this.loading = false;


      }


    });


  }








  selectRestaurant():void{


    this.foods = [];

    this.successMessage = '';

    this.errorMessage = '';



    if(!this.selectedRestaurantId){

      return;

    }



    this.loadFoods();


  }








  loadFoods():void{


    if(!this.selectedRestaurantId){

      return;

    }



    this.loading = true;



    this.foodService

    .getFoodsByRestaurantId(

      this.selectedRestaurantId

    )

    .subscribe({

      next:(foods)=>{


      this.foods = foods;
      
      
      this.totalFoods = foods.length;
      
      
      this.loadRestaurantOrders();
      
      
      this.loading=false;
      
      
},


      error:(error)=>{


        console.error(error);


        this.errorMessage =
        'دریافت غذاها انجام نشد';


        this.loading = false;


      }


    });


  }









  saveFood():void{


    this.errorMessage = '';

    this.successMessage = '';




    if(!this.selectedRestaurantId){


      this.errorMessage =
      'ابتدا رستوران را انتخاب کنید';


      return;

    }




    if(!this.foodName.trim()){


      this.errorMessage =
      'نام غذا الزامی است';


      return;


    }





    if(
      this.foodPrice === null ||
      this.foodPrice <= 0
    ){


      this.errorMessage =
      'قیمت معتبر وارد کنید';


      return;


    }





    const oldFood =

    this.foods.find(

      food =>
      food.id === this.editingFoodId

    );






    const food:Food = {


      id:

      this.editingFoodId ?? 0,



      restaurantId:

      this.selectedRestaurantId,



      categoryId:

      this.foodCategoryId ?? 1,



      name:

      this.foodName.trim(),



      description:

      this.foodDescription.trim(),



      price:

      this.foodPrice,



      imageUrl:

      this.foodImage.trim(),



      rate:

      oldFood?.rate ?? 0,



      isAvailable:

      oldFood?.isAvailable ?? true


    };






    this.saving = true;






    if(this.editingFoodId){



      this.foodService

      .updateFood(

        this.editingFoodId,

        food

      )

      .subscribe({

        next:()=>{


          this.successMessage =
          'غذا با موفقیت ویرایش شد';


          this.resetForm();


          this.loadFoods();


          this.saving = false;


        },


        error:(error)=>{


          console.error(error);


          this.errorMessage =
          'ویرایش غذا انجام نشد';


          this.saving = false;


        }


      });




    }

    else{



      this.foodService

      .addFood(food)

      .subscribe({

        next:()=>{


          this.successMessage =
          'غذا با موفقیت اضافه شد';


          this.resetForm();


          this.loadFoods();


          this.saving = false;


        },


        error:(error)=>{


          console.error(error);


          this.errorMessage =
          'افزودن غذا انجام نشد';


          this.saving = false;


        }


      });



    }



  }









  editFood(food:Food):void{


    this.editingFoodId =
    food.id;


    this.foodName =
    food.name;


    this.foodDescription =
    food.description;


    this.foodPrice =
    food.price;


    this.foodImage =
    food.imageUrl;


    this.foodCategoryId =
    food.categoryId;



    window.scrollTo({

      top:0,

      behavior:'smooth'

    });


  }








  deleteFood(food:Food):void{


    const result = confirm(

      `آیا حذف ${food.name} را تایید می‌کنید؟`

    );



    if(!result){

      return;

    }




    this.foodService

    .deleteFood(food.id)

    .subscribe({

      next:()=>{


        this.successMessage =
        'غذا حذف شد';


        this.loadFoods();


      },


      error:(error)=>{


        console.error(error);


        this.errorMessage =
        'حذف غذا انجام نشد';


      }


    });



  }



  loadRestaurantOrders(){
  
  
  if(!this.selectedRestaurantId){
  
  return;
  
  }
  
  
  
  const orders =
  
  this.orderService
  .getOrdersByRestaurantId(
  
  this.selectedRestaurantId
  
  );
  
  
  
  this.restaurantOrders =
  orders.length;
  
  
  
  this.totalSales =
  
  orders.reduce(
  
  (sum,order)=>
  
  sum + order.totalPrice
  
  ,0);
  
  
  
  }




  resetForm():void{


    this.editingFoodId = null;


    this.foodName = '';

    this.foodDescription = '';

    this.foodPrice = null;


    this.foodImage = '';

    this.foodCategoryId = null;



  }








  get selectedRestaurant():

  Restaurant | undefined {


    return this.restaurants.find(

      restaurant =>

      restaurant.id ===
      this.selectedRestaurantId

    );


  }



}