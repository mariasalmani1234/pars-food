import { Component, Input } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { IconComponent } from './icon.component';
@Component({selector:'app-purchase-summary',standalone:true,imports:[IconComponent],
 template:`<section class="summary" aria-label="خلاصه کل سفارش">
   <header><span class="summary-icon"><app-icon name="cart"/></span><div><h2>خلاصه سفارش</h2><p>{{quantity.toLocaleString('fa-IR')}} غذا@if(restaurantCount > 1){ از {{restaurantCount.toLocaleString('fa-IR')}} رستوران}</p></div></header>
   @if(showItems){<ul>@for(item of items; track item.food.id){<li><span>{{item.quantity.toLocaleString('fa-IR')}} × {{item.food.name}}</span><strong>{{(item.food.price * item.quantity).toLocaleString('fa-IR')}}</strong></li>}</ul>}
   <div class="total"><span>جمع قیمت غذاها</span><strong>{{total.toLocaleString('fa-IR')}} <small>تومان</small></strong></div>
   <p class="note">قیمت و موجودی غذاها پیش از ثبت سفارش بررسی می‌شود.</p>
   <ng-content/>
 </section>`,styleUrl:'./purchase-summary.component.css'})
export class PurchaseSummaryComponent {
  @Input() items: CartItem[]=[];
  @Input() showItems=false;
  get quantity():number{return this.items.reduce((sum,item)=>sum+item.quantity,0);}
  get total():number{return this.items.reduce((sum,item)=>sum+item.food.price*item.quantity,0);}
  get restaurantCount():number{return new Set(this.items.map(item=>item.food.restaurantId)).size;}
}
