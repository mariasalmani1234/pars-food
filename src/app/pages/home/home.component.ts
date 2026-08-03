import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantCardComponent } from '../../shared/restaurant-card/restaurant-card.component';
import { RestaurantService } from '../../services/restaurant.service';
import { OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RestaurantCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  restaurants:Restaurant[]=[]

  constructor(private restaurantService:RestaurantService){}  
  ngOnInit(): void {
    this.restaurants=this.restaurantService.getRestaurants();
  }

  openRestaurant(name:string){
    alert(name);
  }


}
