import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserService } from '../../services/user.service';
import { RestaurantService } from '../../services/restaurant.service';
import { OrderService } from '../../services/order.service';
import { SessionUser } from '../../models/user.model';
import { Restaurant } from '../../models/restaurant.model';
import { Order } from '../../models/order.model';
import { FormsModule } from '@angular/forms';
import { WorkspaceHeaderComponent } from '../../shared/workspace-header.component';
import { OrderRecordComponent } from '../../shared/order-record.component';
import { IconComponent } from '../../shared/icon.component';
import { ImageFallbackDirective } from '../../shared/image-fallback.directive';
import { normalizeSearch } from '../../shared/normalize-search';
import { ORDER_STATUSES, persianNumber } from '../../shared/order-presentation';
import { WorkspaceMetric, WorkspaceMetricsComponent } from '../../shared/workspace-metrics.component';

@Component({ selector: 'app-admin', standalone: true, imports: [CommonModule, RouterLink, FormsModule, WorkspaceHeaderComponent, WorkspaceMetricsComponent, OrderRecordComponent, IconComponent, ImageFallbackDirective],
  templateUrl: './admin.component.html', styleUrl: './admin.component.css' })
export class AdminComponent implements OnInit {
  users: SessionUser[] = [];
  restaurants: Restaurant[] = [];
  orders: Order[] = [];
  usersCount = 0; restaurantsCount = 0; ordersCount = 0; totalSales = 0;
  loading = false;
  errorMessage = '';
  activeSection: 'users' | 'restaurants' | 'orders' = 'users';
  query = ''; roleFilter = ''; statusFilter = '';
  readonly number = persianNumber; readonly statuses = ORDER_STATUSES;
  get metrics(): WorkspaceMetric[] { return [
    {label: 'کاربران', value: this.usersCount}, {label: 'رستوران‌ها', value: this.restaurantsCount},
    {label: 'سفارش‌ها', value: this.ordersCount}, {label: 'ارزش سفارش‌های لغونشده', value: this.totalSales, suffix: 'تومان', accent: true}
  ]; }
  get filteredUsers(): SessionUser[] {
    const query = this.searchKey(this.query);
    return this.users.filter(user => (!this.roleFilter || user.role === this.roleFilter) &&
      this.searchKey(`${user.name} ${user.email} ${user.phone}`).includes(query));
  }
  get filteredRestaurants(): Restaurant[] {
    const query = this.searchKey(this.query);
    return this.restaurants.filter(restaurant => this.searchKey(`${restaurant.name} ${restaurant.city} ${restaurant.address}`).includes(query));
  }
  get filteredOrders(): Order[] {
    const query = this.searchKey(this.query);
    return this.orders.filter(order => (!this.statusFilter || order.status === this.statusFilter) &&
      this.searchKey(`${order.id} ${this.userName(order.userId)} ${order.address} ${order.items.map(item => item.food.name).join(' ')}`).includes(query));
  }
  private searchKey(value: string): string {
    return normalizeSearch(value).replace(/[۰-۹٠-٩]/g, digit => String(digit.charCodeAt(0) % 16)).replace(/[٬,،#]/g, '');
  }
  setSection(section: 'users' | 'restaurants' | 'orders'): void { this.activeSection = section; this.query = ''; this.roleFilter = this.statusFilter = ''; }
  userName(id: number): string { return this.users.find(user => user.id === id)?.name ?? `کاربر ${persianNumber(id)}`; }
  roleLabel(role: string): string { return role === 'admin' ? 'مدیر سامانه' : role === 'restaurant' ? 'مدیر رستوران' : 'مشتری'; }
  constructor(private userService: UserService, private restaurantService: RestaurantService,
    private orderService: OrderService) {}
  ngOnInit(): void { this.loadData(); }
  loadData(): void {
    this.loading = true;
    this.errorMessage = '';
    forkJoin({ users: this.userService.getUsers(), restaurants: this.restaurantService.getRestaurants(),
      orders: this.orderService.getOrders() }).subscribe({
      next: ({ users, restaurants, orders }) => {
        this.users = users.map(({ password, ...user }) => user);
        this.restaurants = restaurants;
        this.orders = orders;
        this.usersCount = users.length;
        this.restaurantsCount = restaurants.length;
        this.ordersCount = orders.length;
        this.totalSales = orders.filter(order => order.status !== 'cancelled')
          .reduce((sum, order) => sum + order.totalPrice, 0);
        this.loading = false;
      },
      error: () => { this.errorMessage = 'دریافت اطلاعات مدیریت انجام نشد.'; this.loading = false; }
    });
  }
}
