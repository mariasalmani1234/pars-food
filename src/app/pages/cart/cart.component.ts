import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import {
  CartService
} from '../../services/cart.service';

import {
  CartItem
} from '../../models/cart-item.model';


@Component({

  selector: 'app-cart',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl:
    './cart.component.html',

  styleUrl:
    './cart.component.css'

})

export class CartComponent {

  constructor(
    public cartService:
      CartService
  ) {}


  get items():
  CartItem[] {

    return this.cartService
      .getItems();

  }


  increase(
    foodId: number
  ): void {

    this.cartService
      .increase(foodId);

  }


  decrease(
    foodId: number
  ): void {

    this.cartService
      .decrease(foodId);

  }


  remove(
    foodId: number
  ): void {

    this.cartService
      .remove(foodId);

  }


  clearCart(): void {

    this.cartService
      .clear();

  }

}