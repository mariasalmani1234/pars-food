import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { IconComponent } from '../../shared/icon.component';
import { ImageFallbackDirective } from '../../shared/image-fallback.directive';
@Component({selector:'app-cart-row',standalone:true,imports:[IconComponent,ImageFallbackDirective],
 templateUrl:'./cart-row.component.html',styleUrl:'./cart-row.component.css'})
export class CartRowComponent {
  @Input({required:true}) item!:CartItem;
  @Output() increase=new EventEmitter<void>();
  @Output() decrease=new EventEmitter<void>();
  @Output() remove=new EventEmitter<void>();
}
