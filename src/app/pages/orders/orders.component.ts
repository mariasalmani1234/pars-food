import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { OrderStatus } from '../../models/order.model';
import { FormsModule } from '@angular/forms';
import { WorkspaceHeaderComponent } from '../../shared/workspace-header.component';
import { OrderRecordComponent } from '../../shared/order-record.component';
import { IconComponent } from '../../shared/icon.component';
import { ORDER_STATUSES, orderStatusText, persianNumber } from '../../shared/order-presentation';

@Component({ selector: 'app-orders', standalone: true, imports: [CommonModule, RouterLink, FormsModule, WorkspaceHeaderComponent, OrderRecordComponent, IconComponent],
  templateUrl: './orders.component.html', styleUrl: './orders.component.css' })
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  errorMessage = '';
  statusFilter: OrderStatus | '' = '';
  readonly statuses = ORDER_STATUSES;
  readonly number = persianNumber;
  get filteredOrders(): Order[] { return this.orders.filter(order => !this.statusFilter || order.status === this.statusFilter); }
  constructor(private orderService: OrderService, private authService: AuthService) {}
  ngOnInit(): void { this.loadOrders(); }
  loadOrders(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    this.loading = true;
    this.errorMessage = '';
    this.orderService.getOrdersByUserId(user.id).subscribe({
      next: orders => { this.orders = orders; this.loading = false; },
      error: () => { this.errorMessage = 'دریافت سفارش‌ها انجام نشد.'; this.loading = false; }
    });
  }
  getStatusText(status: string): string {
    return orderStatusText(status);
  }
}
