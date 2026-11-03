import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Food } from '../../models/food.model';
import { IconComponent } from '../../shared/icon.component';
import { ImageFallbackDirective } from '../../shared/image-fallback.directive';
@Component({selector:'app-food-card',standalone:true,imports:[IconComponent,ImageFallbackDirective],
  templateUrl:'./food-card.component.html',styleUrl:'./food-card.component.css'})
export class FoodCardComponent {
  @Input({required:true}) food!: Food;
  @Input() categoryName = '';
  @Input() quantity = 0;
  @Input() restaurantOpen = true;
  @Output() add = new EventEmitter<void>();
  @Output() increase = new EventEmitter<void>();
  @Output() decrease = new EventEmitter<void>();
  decreaseQuantity(increaseButton: HTMLButtonElement): void {
    if (this.quantity === 1) {
      const target = increaseButton.disabled ? increaseButton.closest<HTMLElement>('article') : increaseButton;
      target?.focus();
    }
    this.decrease.emit();
  }
  @HostListener('focusin', ['$event']) revealFocusedControl(event: FocusEvent): void {
    if (window.innerWidth > 900 || !(event.target instanceof HTMLElement)) return;
    const control = event.target;
    requestAnimationFrame(() => {
      const basket = document.querySelector('app-menu-basket .has-items');
      if (!basket || document.activeElement !== control) return;
      const bottom = control.getBoundingClientRect().bottom;
      const boundary = basket.getBoundingClientRect().top - 16;
      if (bottom > boundary) window.scrollBy({ top: bottom - boundary, behavior: 'instant' });
    });
  }
}
