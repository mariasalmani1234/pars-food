import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { IconComponent } from '../../shared/icon.component';
@Component({selector:'app-restaurant-filters',standalone:true,imports:[FormsModule,IconComponent],
  templateUrl:'./restaurant-filters.component.html',styleUrl:'./restaurant-filters.component.css'})
export class RestaurantFiltersComponent {
  @Input() searchText = '';
  @Input() onlyOpen = false;
  @Input() categoryId: number | null = null;
  @Input() categories: Category[] = [];
  @Input() categoryCounts: Record<number,number> = {};
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() onlyOpenChange = new EventEmitter<boolean>();
  @Output() categoryIdChange = new EventEmitter<number | null>();
  @Output() searchSubmit = new EventEmitter<void>();
  @Output() searchClear = new EventEmitter<void>();
  categoryIcon(id: number): string { return ({1:'burger',2:'pizza',3:'chicken',4:'drink'} as Record<number,string>)[id] ?? 'utensils'; }
}
