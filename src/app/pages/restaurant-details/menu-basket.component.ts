import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../models/cart-item.model';
import { IconComponent } from '../../shared/icon.component';
@Component({selector:'app-menu-basket',standalone:true,imports:[RouterLink,IconComponent],
  templateUrl:'./menu-basket.component.html',styleUrl:'./menu-basket.component.css',
  host:{'[attr.data-has-items]':'items.length ? "true" : null'}})
export class MenuBasketComponent {
  @Input() items: CartItem[] = [];
  get quantity(): number { return this.items.reduce((sum,item) => sum + item.quantity, 0); }
  get total(): number { return this.items.reduce((sum,item) => sum + item.quantity * item.food.price, 0); }
  get restaurantCount(): number { return new Set(this.items.map(item => item.food.restaurantId)).size; }
}
