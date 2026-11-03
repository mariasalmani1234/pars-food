import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EMPTY, Subject, catchError, combineLatest, forkJoin, startWith, switchMap } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';
import { Food } from '../../models/food.model';
import { Category } from '../../models/category.model';
import { RestaurantService } from '../../services/restaurant.service';
import { FoodService } from '../../services/food.service';
import { CartService } from '../../services/cart.service';
import { IconComponent } from '../../shared/icon.component';
import { normalizeSearch } from '../../shared/normalize-search';
import { RestaurantIntroComponent } from './restaurant-intro.component';
import { FoodCardComponent } from './food-card.component';
import { MenuBasketComponent } from './menu-basket.component';

@Component({ selector: 'app-restaurant-detail', standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IconComponent, RestaurantIntroComponent, FoodCardComponent, MenuBasketComponent],
  templateUrl: './restaurant-details.component.html', styleUrl: './restaurant-details.component.css' })
export class RestaurantDetailComponent implements OnInit {
  restaurant?: Restaurant;
  foods: Food[] = []; categories: Category[] = [];
  selectedCategoryId: number | null = null;
  searchText = ''; statusMessage = '';
  loading = true; notFound = false; errorMessage = '';
  private destroyRef = inject(DestroyRef);
  private refresh = new Subject<void>();
  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService,
    public foodService: FoodService, public cartService: CartService) {}

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.refresh.pipe(startWith(undefined))]).pipe(
      switchMap(([params]) => {
        const id = Number(params.get('id'));
        this.restaurant = undefined; this.foods = []; this.selectedCategoryId = null;
        this.searchText = ''; this.statusMessage = '';
        this.loading = true; this.notFound = false; this.errorMessage = '';
        if (!Number.isSafeInteger(id) || id <= 0) { this.loading = false; this.notFound = true; return EMPTY; }
        return forkJoin({ restaurant: this.restaurantService.getRestaurantById(id).pipe(catchError(error => {
            this.notFound = error.status === 404;
            throw error;
          })),
          foods: this.foodService.getFoodsByRestaurantId(id), categories: this.foodService.getCategories() })
          .pipe(catchError(error => {
            this.loading = false;
            if (!this.notFound) this.errorMessage = 'دریافت اطلاعات رستوران انجام نشد. دوباره تلاش کنید.';
            return EMPTY;
          }));
      }), takeUntilDestroyed(this.destroyRef)
    ).subscribe(({ restaurant, foods, categories }) => {
      this.restaurant = restaurant; this.foods = foods;
      this.categories = categories.filter(category => foods.some(food => food.categoryId === category.id));
      this.loading = false;
    });
  }
  retry(): void { this.refresh.next(); }
  get filteredFoods(): Food[] {
    const search = normalizeSearch(this.searchText);
    return this.foods.filter(food => (this.selectedCategoryId === null || food.categoryId === this.selectedCategoryId) &&
      normalizeSearch(food.name + ' ' + food.description).includes(search));
  }
  filterByCategory(categoryId: number | null): void { this.selectedCategoryId = categoryId; }
  clearFilters(): void { this.searchText = ''; this.selectedCategoryId = null; }
  getCategoryName(categoryId: number): string { return this.categories.find(category => category.id === categoryId)?.name ?? 'سایر'; }
  addToCart(food: Food): void {
    if (!this.canIncrease(food)) return;
    this.cartService.addToCart(food); this.announceQuantity(food);
  }
  increaseFood(food: Food): void {
    if (!this.canIncrease(food)) return;
    this.cartService.increase(food.id); this.announceQuantity(food);
  }
  decreaseFood(food: Food): void { this.cartService.decrease(food.id); this.announceQuantity(food); }
  getQuantity(foodId: number): number { return this.cartService.getFoodQuantity(foodId); }
  private canIncrease(food: Food): boolean {
    return !!this.restaurant?.isOpen && food.isAvailable && food.restaurantId === this.restaurant.id;
  }
  private announceQuantity(food: Food): void {
    const count = this.getQuantity(food.id);
    this.statusMessage = count ? `${food.name}، ${count.toLocaleString('fa-IR')} عدد در سبد خرید` : `${food.name} از سبد خرید حذف شد`;
  }
}
