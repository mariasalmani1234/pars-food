import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CartItem } from '../models/cart-item.model';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly storageKey = 'pars-food-cart';

  private items: CartItem[] = this.loadCart();

  private readonly itemsSubject =
    new BehaviorSubject<CartItem[]>(this.items);

  readonly items$ =
    this.itemsSubject.asObservable();


  addToCart(food: Food): void {

    const currentItem =
      this.items.find(
        item => item.food.id === food.id
      );

    if (currentItem) {

      currentItem.quantity += 1;

    } else {

      this.items.push({
        food,
        quantity: 1
      });

    }

    this.saveCart();
  }


  increase(foodId: number): void {

    const item =
      this.items.find(
        cartItem =>
          cartItem.food.id === foodId
      );

    if (!item) {
      return;
    }

    item.quantity += 1;

    this.saveCart();
  }


  decrease(foodId: number): void {

    const item =
      this.items.find(
        cartItem =>
          cartItem.food.id === foodId
      );

    if (!item) {
      return;
    }

    if (item.quantity <= 1) {

      this.remove(foodId);

      return;
    }

    item.quantity -= 1;

    this.saveCart();
  }


  remove(foodId: number): void {

    this.items =
      this.items.filter(
        item =>
          item.food.id !== foodId
      );

    this.saveCart();
  }


  clear(): void {

    this.items = [];

    this.saveCart();
  }


  getItems(): CartItem[] {

    return this.items;
  }


  getTotalQuantity(): number {

    return this.items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  }


  getTotalPrice(): number {

    return this.items.reduce(

      (total, item) =>
        total +
        item.food.price *
        item.quantity,

      0

    );

  }


  getFoodQuantity(foodId: number): number {

    return (
      this.items.find(
        item =>
          item.food.id === foodId
      )?.quantity ?? 0
    );

  }


  private saveCart(): void {

    if (
      typeof localStorage !== 'undefined'
    ) {

      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.items)
      );

    }

    this.itemsSubject.next(
      [...this.items]
    );
  }


  private loadCart(): CartItem[] {

    if (
      typeof localStorage === 'undefined'
    ) {

      return [];

    }


    const savedCart =
      localStorage.getItem(
        this.storageKey
      );


    if (!savedCart) {

      return [];

    }


    try {

      return JSON.parse(
        savedCart
      ) as CartItem[];

    } catch {

      return [];

    }

    

  }

  getItemsCount():number {


    return this.items.reduce(
    
    (total,item)=>
    
    total + item.quantity,
    
    0
    
    );
    

}

}