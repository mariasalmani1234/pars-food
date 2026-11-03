import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SessionUser } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { WorkspaceHeaderComponent } from '../../shared/workspace-header.component';
import { OrderRecordComponent } from '../../shared/order-record.component';
import { IconComponent } from '../../shared/icon.component';
import { persianNumber } from '../../shared/order-presentation';

@Component({ selector: 'app-profile', standalone: true, imports: [CommonModule, RouterLink, WorkspaceHeaderComponent, OrderRecordComponent, IconComponent],
  templateUrl: './profile.component.html', styleUrl: './profile.component.css' })
export class ProfileComponent implements OnInit {
  user?: SessionUser;
  orders: Order[] = [];
  errorMessage = '';
  loading = false;
  readonly number = persianNumber;
  get recentOrders(): Order[] { return [...this.orders].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 2); }
  get activeOrders(): number { return this.orders.filter(order => ['pending', 'accepted', 'preparing'].includes(order.status)).length; }
  get dashboardLink(): string | null { return this.user?.role === 'admin' ? '/admin' : this.user?.role === 'restaurant' ? '/restaurant-management' : null; }
  constructor(private authService: AuthService, private orderService: OrderService, private router: Router) {}
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser() ?? undefined;
    this.loadOrders();
  }
  loadOrders(): void {
    if (!this.user) return;
    this.errorMessage = '';
    this.loading = true;
    this.orderService.getOrdersByUserId(this.user.id).subscribe({
      next: orders => { this.orders = orders; this.loading = false; },
      error: () => { this.errorMessage = 'دریافت سابقه خرید انجام نشد.'; this.loading = false; }
    });
  }
  get totalPurchase(): number {
    return this.orders.filter(order => order.status !== 'cancelled')
      .reduce((total, order) => total + order.totalPrice, 0);
  }
  logout(): void { this.authService.logout(); void this.router.navigate(['/login']); }
}
