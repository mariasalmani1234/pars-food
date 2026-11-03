import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Food } from '../../models/food.model';
import { ImageFallbackDirective } from '../../shared/image-fallback.directive';
import { persianNumber } from '../../shared/order-presentation';

@Component({ selector: 'app-management-food-row', standalone: true, imports: [ImageFallbackDirective],
  template: `<article><img [appImage]="food.imageUrl" [alt]="food.name"><div class="content"><div class="meta"><span>{{category}}</span><span [class.unavailable]="!food.isAvailable">{{food.isAvailable ? 'موجود' : 'ناموجود'}}</span></div><h3>{{food.name}}</h3><p>{{food.description || 'توضیحی ثبت نشده است.'}}</p><div class="bottom"><strong>{{number(food.price)}} <small>تومان</small></strong><div class="actions"><button (click)="edit.emit(food)" [disabled]="busy" [attr.aria-label]="'ویرایش ' + food.name">ویرایش</button><button class="delete" (click)="remove.emit(food)" [disabled]="busy" [attr.aria-label]="'حذف ' + food.name">حذف</button></div></div></div></article>`,
  styles: [`:host{display:block;}article{display:flex;gap:18px;border:1px solid var(--border);border-radius:16px;background:white;padding:18px;}img{width:100px;height:100px;flex:none;object-fit:cover;border-radius:12px;background:var(--primary-light);}.content{flex:1;min-width:0;}.meta{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}.meta span{font-size:11px;color:var(--text-light);}.meta span:last-child{color:var(--success);}.meta span.unavailable{color:#a51f39;}h3{overflow-wrap:anywhere;font-size:16px;margin:5px 0;}p{font-size:12px;color:var(--text-light);margin:0 0 12px;overflow-wrap:anywhere;}.bottom{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;}strong{font-size:17px;}small{font-size:11px;color:var(--text-light);font-weight:400;}.actions{display:flex;gap:8px;}button{min-height:44px;padding:8px 15px;border:1px solid var(--border);border-radius:9px;background:white;color:var(--primary-dark);font-size:12px;}button:hover{background:var(--primary-light);}.delete{color:#a51f39;}@media(max-width:600px){article{padding:16px;gap:12px;align-items:flex-start;}img{width:66px;height:66px;}h3{font-size:15px;}.bottom{margin-inline-start:-78px;margin-top:16px;}strong{font-size:16px;}.actions{gap:6px;}button{padding-inline:12px;}}`]
})
export class ManagementFoodRowComponent {
  @Input({required:true}) food!: Food; @Input() category = ''; @Input() busy = false;
  @Output() edit = new EventEmitter<Food>(); @Output() remove = new EventEmitter<Food>();
  readonly number = persianNumber;
}
