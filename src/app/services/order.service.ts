import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Order } from '../models/order.model';
import { CartItem } from '../models/cart-item.model';
import { Food } from '../models/food.model';
import { FoodService } from './food.service';
import { isCartItem } from './cart.service';

type StoredOrder = Omit<Order, 'items'> & {
  items: (CartItem | { foodId: number; name: string; price: number; quantity: number })[];
};

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly apiUrl = 'http://localhost:3000/orders';
  constructor(private http: HttpClient, private foodService: FoodService) {}

  createOrder(order: Omit<Order, 'id'>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  getOrders(): Observable<Order[]> {
    return forkJoin({ orders: this.http.get<StoredOrder[]>(this.apiUrl),
      foods: this.foodService.getFoods() }).pipe(map(({ orders, foods }) => {
      // Preserve orders created by older versions without deleting browser history.
      const merged = new Map<number, StoredOrder>();
      for (const order of [...this.getLegacyOrders(), ...orders]) merged.set(order.id, order);
      return [...merged.values()].map(order => this.normalizeOrder(order, foods))
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    }));
  }

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.getOrders().pipe(map(orders => orders.filter(order => order.userId === userId)));
  }

  getOrdersByRestaurantId(restaurantId: number): Observable<Order[]> {
    return this.getOrders().pipe(map(orders => orders.filter(order =>
      order.items.some(item => item.food.restaurantId === restaurantId))));
  }

  private getLegacyOrders(): StoredOrder[] {
    try {
      const data: unknown = JSON.parse(localStorage.getItem('pars-food-orders') ?? '[]');
      return Array.isArray(data) ? data.filter(order => order &&
        Number.isSafeInteger(order.id) && Number.isSafeInteger(order.userId) &&
        Array.isArray(order.items) && order.items.every(isCartItem) &&
        Number.isFinite(order.totalPrice) && typeof order.createdAt === 'string') : [];
    } catch { return []; }
  }

  private normalizeOrder(order: StoredOrder, foods: Food[]): Order {
    return { ...order, items: order.items.map(item => {
      if ('food' in item) return item;
      const food = foods.find(food => food.id === item.foodId);
      return { quantity: item.quantity, food: {
        id: item.foodId, restaurantId: food?.restaurantId ?? 0,
        categoryId: food?.categoryId ?? 0, name: item.name,
        description: food?.description ?? '', price: item.price,
        imageUrl: food?.imageUrl ?? '', rate: food?.rate ?? 0, isAvailable: false
      } };
    }) };
  }
}
