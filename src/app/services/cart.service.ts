import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Food } from '../models/food.model';

export function isCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== 'object') return false;
  const { food, quantity } = item as CartItem;
  return !!food && Number.isSafeInteger(food.id) && Number.isSafeInteger(food.restaurantId) &&
    typeof food.name === 'string' && Number.isFinite(food.price) && food.price > 0 &&
    Number.isSafeInteger(quantity) && quantity > 0;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'pars-food-cart';
  private items: CartItem[] = this.loadCart();
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(this.getItems());
  readonly items$ = this.itemsSubject.asObservable();

  addToCart(food: Food): void {
    if (!food.isAvailable || !isCartItem({ food, quantity: 1 })) return;
    const item = this.items.find(item => item.food.id === food.id);
    if (item) item.quantity += 1;
    else this.items.push({ food: { ...food }, quantity: 1 });
    this.saveCart();
  }

  increase(foodId: number): void {
    const item = this.items.find(item => item.food.id === foodId);
    if (item && item.quantity < Number.MAX_SAFE_INTEGER) {
      item.quantity += 1;
      this.saveCart();
    }
  }

  decrease(foodId: number): void {
    const item = this.items.find(item => item.food.id === foodId);
    if (!item) return;
    if (item.quantity <= 1) this.remove(foodId);
    else { item.quantity -= 1; this.saveCart(); }
  }

  remove(foodId: number): void {
    this.items = this.items.filter(item => item.food.id !== foodId);
    this.saveCart();
  }

  clear(): void { this.items = []; this.saveCart(); }

  /** Remove the submitted snapshot, preserving additions made while the request was pending. */
  consumeSubmittedItems(submitted: CartItem[]): void {
    const quantities = new Map(submitted.map(item => [item.food.id, item.quantity]));
    this.items = this.items.map(item => ({ ...item,
      quantity: Math.max(0, item.quantity - (quantities.get(item.food.id) ?? 0))
    })).filter(item => item.quantity > 0);
    this.saveCart();
  }

  getItems(): CartItem[] {
    return this.items.map(item => ({ food: { ...item.food }, quantity: item.quantity }));
  }

  refreshFoods(foods: Food[]): void {
    this.items = this.items.map(item => ({ ...item,
      food: { ...(foods.find(food => food.id === item.food.id) ?? item.food) }
    }));
    this.saveCart();
  }

  getTotalQuantity(): number { return this.items.reduce((sum, item) => sum + item.quantity, 0); }
  getItemsCount(): number { return this.getTotalQuantity(); }
  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
  }
  getFoodQuantity(foodId: number): number {
    return this.items.find(item => item.food.id === foodId)?.quantity ?? 0;
  }

  private saveCart(): void {
    try { localStorage.setItem(this.storageKey, JSON.stringify(this.items)); }
    catch { /* Keep the current cart usable when browser storage is disabled or full. */ }
    this.itemsSubject.next(this.getItems());
  }

  private loadCart(): CartItem[] {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
      if (!Array.isArray(value)) return [];
      const items = new Map<number, CartItem>();
      for (const item of value.filter(isCartItem)) {
        const existing = items.get(item.food.id);
        if (!existing) items.set(item.food.id, item);
        else if (Number.isSafeInteger(existing.quantity + item.quantity)) existing.quantity += item.quantity;
      }
      return [...items.values()];
    } catch { return []; }
  }
}
