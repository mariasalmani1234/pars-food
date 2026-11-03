import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { ImageFallbackDirective } from '../image-fallback.directive';
import { IconComponent } from '../icon.component';
@Component({selector:'app-restaurant-card',standalone:true,imports:[CommonModule,RouterLink,ImageFallbackDirective,IconComponent],templateUrl:'./restaurant-card.component.html',styleUrl:'./restaurant-card.component.css'})
export class RestaurantCardComponent {@Input() restaurant!:Restaurant;}
