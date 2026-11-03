import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize, forkJoin, switchMap } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { FoodService } from '../../services/food.service';
import { RestaurantService } from '../../services/restaurant.service';
import { IconComponent } from '../../shared/icon.component';
import { PurchaseStepsComponent } from '../../shared/purchase-steps.component';
import { PurchaseSummaryComponent } from '../../shared/purchase-summary.component';

@Component({selector:'app-checkout',standalone:true,
 imports:[FormsModule,RouterLink,IconComponent,PurchaseStepsComponent,PurchaseSummaryComponent],
 templateUrl:'./checkout.component.html',styleUrl:'./checkout.component.css'})
export class CheckoutComponent {
  address='';phone='';message='';addressError='';phoneError='';submitting=false;
  constructor(public cartService:CartService,private orderService:OrderService,
    public authService:AuthService,private router:Router,private foodService:FoodService,
    private restaurantService:RestaurantService,private host:ElementRef<HTMLElement>){}

  submitOrder():void{
    if(this.submitting)return;
    this.message='';
    this.addressError=this.address.trim().length<10?'آدرس کامل (حداقل ۱۰ کاراکتر) وارد کن.':'';
    const phone=this.phone.replace(/[۰-۹]/g,digit=>String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
      .replace(/[٠-٩]/g,digit=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))).replace(/[\s-]/g,'');
    this.phoneError=/^09\d{9}$/.test(phone)?'':'شماره موبایل معتبر ۱۱ رقمی وارد کن.';
    if(this.addressError||this.phoneError){this.focus(this.addressError?'delivery-address':'delivery-phone');return;}
    const user=this.authService.getCurrentUser();
    if(!user){void this.router.navigate(['/login'],{queryParams:{returnUrl:'/checkout'}});return;}
    const items=this.cartService.getItems();
    if(!items.length){this.message='سبد خرید خالی است.';return;}
    this.submitting=true;
    forkJoin({foods:this.foodService.getFoods(),restaurants:this.restaurantService.getRestaurants()})
      .pipe(switchMap(({foods,restaurants})=>{
        for(const item of items){
          const food=foods.find(food=>food.id===item.food.id);
          if(!food?.isAvailable||!restaurants.some(restaurant=>restaurant.id===food.restaurantId&&restaurant.isOpen))
            throw new Error(`«${item.food.name}» در حال حاضر قابل سفارش نیست. سبد خرید را اصلاح کن.`);
        }
        if(items.some(item=>foods.find(food=>food.id===item.food.id)!.price!==item.food.price)){
          this.cartService.refreshFoods(foods);
          throw new Error('قیمت غذاها تغییر کرده است. مبلغ جدید را بررسی و دوباره ثبت کن.');
        }
        return this.orderService.createOrder({userId:user.id,items,
          totalPrice:items.reduce((sum,item)=>sum+item.food.price*item.quantity,0),
          address:this.address.trim(),phone,status:'pending',createdAt:new Date().toISOString()});
      }),finalize(()=>this.submitting=false)).subscribe({
        next:()=>{this.cartService.consumeSubmittedItems(items);void this.router.navigate(['/orders']);},
        error:error=>{this.message=error instanceof Error?error.message:'ثبت سفارش انجام نشد. سبد خرید محفوظ است؛ دوباره تلاش کن.';this.focus('checkout-error');}
      });
  }
  private focus(id:string):void{setTimeout(()=>this.host.nativeElement.querySelector<HTMLElement>('#'+id)?.focus());}
}
