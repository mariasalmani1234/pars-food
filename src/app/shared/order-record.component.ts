import { Component, Input } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderStatusComponent } from './order-status.component';
import { IconComponent } from './icon.component';
import { orderDate, persianNumber } from './order-presentation';

@Component({ selector: 'app-order-record', standalone: true, imports: [OrderStatusComponent, IconComponent],
  template: `<article [class.compact]="compact"><header><div><h3>سفارش <bdi> #{{number(order.id)}}</bdi></h3><time [attr.datetime]="order.createdAt">{{date(order.createdAt)}}</time></div><app-order-status [status]="order.status"/></header>
  @if(!compact){<ul>@for(item of order.items; track $index){<li><span><b class="quantity">{{number(item.quantity)}} ×</b> {{item.food.name}}</span><span class="price">{{number(item.food.price * item.quantity)}} <small>تومان</small></span></li>}</ul>}
  @else{<p class="summary">{{itemSummary}} <span>· {{number(quantity)}} عدد</span></p>}
  <footer>@if(!compact){<div class="address"><app-icon name="pin"/><div><small>نشانی تحویل</small><p>{{order.address || 'نشانی ثبت نشده'}}</p></div></div>}<div class="total"><span>{{compact ? 'مبلغ سفارش' : 'مبلغ کل سفارش'}}</span><strong>{{number(order.totalPrice)}} <small>تومان</small></strong></div></footer></article>`,
  styleUrl: './order-record.component.css'
})
export class OrderRecordComponent {
  @Input({ required: true }) order!: Order;
  @Input() compact = false;
  readonly number = persianNumber; readonly date = orderDate;
  get quantity(): number { return this.order.items.reduce((sum, item) => sum + item.quantity, 0); }
  get itemSummary(): string { return this.order.items.map(item => item.food.name).join('، '); }
}
