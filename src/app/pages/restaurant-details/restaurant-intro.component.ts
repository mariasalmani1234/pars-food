import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { IconComponent } from '../../shared/icon.component';
import { ImageFallbackDirective } from '../../shared/image-fallback.directive';
@Component({selector:'app-restaurant-intro',standalone:true,imports:[RouterLink,IconComponent,ImageFallbackDirective],
  templateUrl:'./restaurant-intro.component.html',styleUrl:'./restaurant-intro.component.css'})
export class RestaurantIntroComponent {
  @Input({required:true}) restaurant!: Restaurant;
  get deliveryTime(): number | null {
    const time = this.restaurant.deliveryTime;
    return typeof time === 'number' && Number.isFinite(time) && time > 0 ? time : null;
  }
}
