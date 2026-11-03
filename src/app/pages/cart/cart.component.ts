import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CartItem } from '../../models/cart-item.model';
import { IconComponent } from '../../shared/icon.component';
import { PurchaseStepsComponent } from '../../shared/purchase-steps.component';
import { PurchaseSummaryComponent } from '../../shared/purchase-summary.component';
import { CartRowComponent } from './cart-row.component';
@Component({selector:'app-cart',standalone:true,imports:[RouterLink,IconComponent,PurchaseStepsComponent,PurchaseSummaryComponent,CartRowComponent],
 templateUrl:'./cart.component.html',styleUrl:'./cart.component.css'})
export class CartComponent {
  statusMessage='';
  constructor(public cartService:CartService,public authService:AuthService){}
  get items():CartItem[]{return this.cartService.getItems();}
  increase(foodId:number):void{
    if (!this.items.find(item=>item.food.id===foodId)?.food.isAvailable) return;
    this.cartService.increase(foodId);this.announce(foodId);
  }
  decrease(foodId:number):void{this.cartService.decrease(foodId);this.announce(foodId);}
  remove(foodId:number):void{const name=this.items.find(item=>item.food.id===foodId)?.food.name;this.cartService.remove(foodId);this.statusMessage=`${name ?? 'غذا'} از سبد خرید حذف شد`;}
  clearCart():void{this.cartService.clear();}
  private announce(foodId:number):void{const item=this.items.find(item=>item.food.id===foodId);this.statusMessage=item?`${item.food.name}، ${item.quantity.toLocaleString('fa-IR')} عدد در سبد خرید`:'غذا از سبد خرید حذف شد';}
}
