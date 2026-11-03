import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RestaurantService } from '../../services/restaurant.service';
import { FoodService } from '../../services/food.service';
import { Restaurant } from '../../models/restaurant.model';
import { Food } from '../../models/food.model';
import { Category } from '../../models/category.model';
import { RestaurantCardComponent } from '../../shared/restaurant-card/restaurant-card.component';
import { IconComponent } from '../../shared/icon.component';
import { RestaurantFiltersComponent } from './restaurant-filters.component';
import { normalizeSearch } from '../../shared/normalize-search';

@Component({ selector: 'app-restaurants', standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RestaurantCardComponent, IconComponent, RestaurantFiltersComponent],
  templateUrl: './restaurants.component.html', styleUrl: './restaurants.component.css' })
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = []; filteredRestaurants: Restaurant[] = [];
  foods: Food[] = []; categories: Category[] = [];
  searchText = ''; onlyOpen = false; loading = false; errorMessage = '';
  sortOrder = 'default';
  categoryId: number | null = null;
  private destroyRef = inject(DestroyRef);
  private hasQuerySearch = false;

  constructor(private restaurantService: RestaurantService, private foodService: FoodService,
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const id = Number(params.get('category'));
      this.categoryId = Number.isSafeInteger(id) && id > 0 ? id : null;
      if (params.has('q') || this.hasQuerySearch) this.searchText = params.get('q') ?? '';
      this.hasQuerySearch = params.has('q');
      this.filterRestaurants();
    });
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.loading = true; this.errorMessage = ''; this.filteredRestaurants = [];
    forkJoin({ restaurants: this.restaurantService.getRestaurants(), foods: this.foodService.getFoods(),
      categories: this.foodService.getCategories() }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ restaurants, foods, categories }) => {
        this.restaurants = restaurants; this.foods = foods; this.categories = categories;
        this.loading = false; this.filterRestaurants();
      },
      error: () => { this.loading = false; this.errorMessage = 'دریافت رستوران‌ها انجام نشد. دوباره تلاش کنید.'; }
    });
  }

  filterRestaurants(): void {
    const search = normalizeSearch(this.searchText);
    const filtered = this.restaurants.filter(restaurant =>
      normalizeSearch(restaurant.name).includes(search) && (!this.onlyOpen || restaurant.isOpen) &&
      (this.categoryId === null || this.foods.some(food =>
        food.restaurantId === restaurant.id && food.categoryId === this.categoryId)));
    this.filteredRestaurants = this.sortOrder === 'rating' ? filtered.sort((a,b) => b.rate-a.rate) : filtered;
  }

  selectCategory(id: number | null): void {
    this.categoryId = id; this.filterRestaurants(); this.updateQuery();
  }
  submitSearch(): void { this.searchText = this.searchText.trim(); this.filterRestaurants(); this.updateQuery(); }
  clearSearch(): void { this.searchText = ''; this.filterRestaurants(); this.updateQuery(); }
  clearFilters(): void {
    this.searchText = ''; this.categoryId = null; this.onlyOpen = false; this.sortOrder = 'default';
    this.filterRestaurants();
    void this.router.navigate(['/restaurants'], { queryParams: {}, replaceUrl: true });
  }
  get hasFilters(): boolean { return !!this.searchText.trim() || this.categoryId !== null || this.onlyOpen || this.sortOrder !== 'default'; }
  categoryCount(id: number): number {
    return this.restaurants.filter(restaurant => this.foods.some(food =>
      food.restaurantId === restaurant.id && food.categoryId === id)).length;
  }
  get categoryCounts(): Record<number,number> {
    return Object.fromEntries(this.categories.map(category => [category.id, this.categoryCount(category.id)]));
  }
  private updateQuery(): void {
    void this.router.navigate(['/restaurants'], {
      queryParams: { q: this.searchText.trim() || null, category: this.categoryId }, replaceUrl: true
    });
  }
}
