import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { RestaurantService } from '../../services/restaurant.service';
import { OrderService } from '../../services/order.service';
import { FoodService } from '../../services/food.service';
import { AuthService } from '../../services/auth.service';
import { Restaurant } from '../../models/restaurant.model';
import { Food } from '../../models/food.model';
import { Category } from '../../models/category.model';
import { WorkspaceHeaderComponent } from '../../shared/workspace-header.component';
import { WorkspaceMetric, WorkspaceMetricsComponent } from '../../shared/workspace-metrics.component';
import { IconComponent } from '../../shared/icon.component';
import { normalizeSearch } from '../../shared/normalize-search';
import { persianNumber } from '../../shared/order-presentation';
import { FoodDraft, FoodEditorComponent } from './food-editor.component';
import { ManagementFoodRowComponent } from './management-food-row.component';

@Component({ selector: 'app-restaurant-management', standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, WorkspaceHeaderComponent, WorkspaceMetricsComponent,
    IconComponent, FoodEditorComponent, ManagementFoodRowComponent],
  templateUrl: './restaurant-management.component.html', styleUrl: './restaurant-management.component.css' })
export class RestaurantManagementComponent implements OnInit {
  totalFoods = 0; restaurantOrders = 0; totalSales = 0;
  restaurants: Restaurant[] = []; foods: Food[] = []; categories: Category[] = [];
  selectedRestaurantId: number | null = null;
  loading = false; saving = false; menuLoading = false; statsLoading = false; categoriesLoading = false;
  menuLoaded = false; statsLoaded = false;
  restaurantError = ''; categoryError = ''; menuError = ''; statsError = '';
  errorMessage = ''; menuActionError = ''; successMessage = ''; query = '';
  editingFoodId: number | null = null;
  draft: FoodDraft = { name: '', description: '', image: '', price: null, categoryId: null };
  private menuRequest = 0; private statsRequest = 0; private selectionVersion = 0;
  @ViewChild(FoodEditorComponent) editor?: FoodEditorComponent;
  @ViewChild('menuTitle') menuTitle?: ElementRef<HTMLHeadingElement>;
  readonly number = persianNumber;
  get foodName(): string { return this.draft.name; } set foodName(value: string) { this.draft.name = value; }
  get foodDescription(): string { return this.draft.description; } set foodDescription(value: string) { this.draft.description = value; }
  get foodImage(): string { return this.draft.image; } set foodImage(value: string) { this.draft.image = value; }
  get foodPrice(): number | null { return this.draft.price; } set foodPrice(value: number | null) { this.draft.price = value; }
  get foodCategoryId(): number | null { return this.draft.categoryId; } set foodCategoryId(value: number | null) { this.draft.categoryId = value; }

  constructor(private restaurantService: RestaurantService, private foodService: FoodService,
    private orderService: OrderService, private authService: AuthService) {}

  ngOnInit(): void { this.loadRestaurants(); this.loadCategories(); }
  loadCategories(): void {
    this.categoriesLoading = true; this.categoryError = '';
    this.foodService.getCategories().subscribe({
      next: categories => { this.categories = categories; this.categoriesLoading = false; },
      error: () => { this.categoriesLoading = false; this.categoryError = 'دریافت دسته‌بندی‌ها انجام نشد.'; }
    });
  }
  loadRestaurants(): void {
    this.loading = true; this.restaurantError = '';
    this.restaurantService.getRestaurants().subscribe({
      next: restaurants => {
        const user = this.authService.getCurrentUser();
        this.restaurants = restaurants.filter(restaurant => user?.role === 'admin' ||
          (user?.role === 'restaurant' && restaurant.id === user.restaurantId));
        this.loading = false;
        if (this.restaurants.length === 1) {
          this.selectedRestaurantId = this.restaurants[0].id; this.selectRestaurant();
        }
      },
      error: () => { this.restaurantError = 'دریافت رستوران‌ها انجام نشد.'; this.loading = false; }
    });
  }
  selectRestaurant(): void {
    this.selectionVersion++; this.menuRequest++; this.statsRequest++;
    this.resetForm(); this.foods = []; this.query = '';
    this.totalFoods = this.restaurantOrders = this.totalSales = 0;
    this.menuLoaded = this.statsLoaded = this.menuLoading = this.statsLoading = false;
    this.successMessage = this.menuError = this.statsError = this.menuActionError = '';
    if (this.selectedRestaurant) { this.loadFoods(); this.loadRestaurantOrders(); }
  }
  loadFoods(): void {
    const restaurantId = this.selectedRestaurantId; const request = ++this.menuRequest;
    if (!restaurantId || !this.selectedRestaurant) return;
    this.menuLoading = true; this.menuLoaded = false; this.menuError = '';
    this.foodService.getFoodsByRestaurantId(restaurantId).subscribe({
      next: foods => {
        if (this.selectedRestaurantId !== restaurantId || request !== this.menuRequest) return;
        this.foods = foods.filter(food => food.restaurantId === restaurantId);
        this.totalFoods = this.foods.length; this.menuLoading = false; this.menuLoaded = true;
      },
      error: () => {
        if (this.selectedRestaurantId !== restaurantId || request !== this.menuRequest) return;
        this.menuError = 'دریافت منوی رستوران انجام نشد.'; this.menuLoading = false;
      }
    });
  }
  saveFood(): void {
    if (this.saving) return;
    this.errorMessage = this.successMessage = '';
    if (!this.selectedRestaurant) { this.errorMessage = 'ابتدا رستوران را انتخاب کنید.'; return; }
    if (!this.foodName.trim()) { this.errorMessage = 'نام غذا الزامی است.'; return; }
    if (this.foodPrice === null || !Number.isFinite(this.foodPrice) || this.foodPrice <= 0) {
      this.errorMessage = 'قیمت معتبر وارد کنید.'; return;
    }
    if (this.categoriesLoading || this.categoryError || !this.categories.some(category => category.id === this.foodCategoryId)) {
      this.errorMessage = 'دسته‌بندی معتبر غذا را انتخاب کنید.'; return;
    }
    const oldFood = this.foods.find(food => food.id === this.editingFoodId);
    if (this.editingFoodId !== null && !oldFood) { this.errorMessage = 'غذای مورد نظر در این رستوران پیدا نشد.'; return; }
    const restaurantId = this.selectedRestaurant.id; const version = this.selectionVersion;
    const food: Omit<Food, 'id'> = { restaurantId, categoryId: this.foodCategoryId!, name: this.foodName.trim(),
      description: this.foodDescription.trim(), price: this.foodPrice, imageUrl: this.foodImage.trim(),
      rate: oldFood?.rate ?? 0, isAvailable: oldFood?.isAvailable ?? true };
    this.saving = true;
    const request = oldFood ? this.foodService.updateFood(oldFood.id, { ...food, id: oldFood.id }) : this.foodService.addFood(food);
    request.pipe(finalize(() => this.saving = false)).subscribe({
      next: () => {
        if (restaurantId !== this.selectedRestaurantId || version !== this.selectionVersion) return;
        this.successMessage = oldFood ? 'تغییرات غذا ذخیره شد.' : 'غذا به منو اضافه شد.';
        this.resetForm(); this.loadFoods(); this.loadRestaurantOrders();
      },
      error: () => {
        if (restaurantId === this.selectedRestaurantId && version === this.selectionVersion)
          this.errorMessage = 'ذخیره غذا انجام نشد. اطلاعات شما حفظ شده؛ دوباره تلاش کنید.';
      }
    });
  }
  editFood(food: Food): void {
    if (this.saving || food.restaurantId !== this.selectedRestaurantId) return;
    this.editingFoodId = food.id; this.foodName = food.name; this.foodDescription = food.description;
    this.foodPrice = food.price; this.foodImage = food.imageUrl; this.foodCategoryId = food.categoryId;
    this.errorMessage = this.successMessage = '';
    this.focusEditor();
  }
  beginAdd(): void {
    if (this.saving) return;
    this.resetForm(); this.successMessage = '';
    this.focusEditor();
  }
  focusEditor(): void { queueMicrotask(() => this.editor?.focusName()); }
  focusMenu(): void {
    const heading = this.menuTitle?.nativeElement;
    if (!heading) return;
    heading.focus({preventScroll: true});
    heading.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
  }
  deleteFood(food: Food): void {
    if (this.saving || food.restaurantId !== this.selectedRestaurantId || !confirm(`آیا حذف «${food.name}» را تأیید می‌کنید؟`)) return;
    const restaurantId = this.selectedRestaurantId; const version = this.selectionVersion;
    this.saving = true; this.menuActionError = this.successMessage = '';
    this.foodService.deleteFood(food.id).pipe(finalize(() => this.saving = false)).subscribe({
      next: () => {
        if (restaurantId !== this.selectedRestaurantId || version !== this.selectionVersion) return;
        if (this.editingFoodId === food.id) this.resetForm();
        this.successMessage = 'غذا از منو حذف شد.'; this.loadFoods(); this.loadRestaurantOrders();
      },
      error: () => {
        if (restaurantId === this.selectedRestaurantId && version === this.selectionVersion)
          this.menuActionError = `حذف «${food.name}» انجام نشد. دوباره تلاش کنید.`;
      }
    });
  }
  loadRestaurantOrders(): void {
    const restaurantId = this.selectedRestaurantId; const request = ++this.statsRequest;
    if (!restaurantId || !this.selectedRestaurant) return;
    this.statsLoading = true; this.statsLoaded = false; this.statsError = '';
    this.orderService.getOrdersByRestaurantId(restaurantId).subscribe({
      next: orders => {
        if (this.selectedRestaurantId !== restaurantId || request !== this.statsRequest) return;
        const scopedOrders = orders.filter(order => order.items.some(item => item.food.restaurantId === restaurantId));
        this.restaurantOrders = scopedOrders.length;
        this.totalSales = scopedOrders.filter(order => order.status !== 'cancelled').reduce((sum, order) => sum +
          order.items.filter(item => item.food.restaurantId === restaurantId)
            .reduce((total, item) => total + item.food.price * item.quantity, 0), 0);
        this.statsLoading = false; this.statsLoaded = true;
      },
      error: () => {
        if (this.selectedRestaurantId !== restaurantId || request !== this.statsRequest) return;
        this.statsError = 'دریافت آمار سفارش‌ها انجام نشد.'; this.statsLoading = false;
      }
    });
  }
  resetForm(): void {
    this.editingFoodId = null; this.draft = {name: '', description: '', image: '', price: null, categoryId: null};
    this.errorMessage = '';
  }
  get selectedRestaurant(): Restaurant | undefined { return this.restaurants.find(restaurant => restaurant.id === this.selectedRestaurantId); }
  get restaurantRate(): number { return this.selectedRestaurant?.rate ?? 0; }
  get filteredFoods(): Food[] { const query = normalizeSearch(this.query); return this.foods.filter(food => normalizeSearch(`${food.name} ${food.description}`).includes(query)); }
  get metrics(): WorkspaceMetric[] {
    const menuHint = this.menuLoading ? 'در حال دریافت…' : this.menuError ? 'دریافت نشد' : '';
    const statsHint = this.statsLoading ? 'در حال دریافت…' : this.statsError ? 'دریافت نشد' : '';
    return [{label: 'غذاهای منو', value: this.menuLoaded ? this.totalFoods : null, hint: menuHint},
      {label: 'سفارش‌ها', value: this.statsLoaded ? this.restaurantOrders : null, hint: statsHint},
      {label: 'امتیاز رستوران', value: this.restaurantRate},
      {label: 'ارزش سفارش‌های لغونشده', value: this.statsLoaded ? this.totalSales : null, suffix: 'تومان', hint: statsHint, accent: true}];
  }
  getCategoryName(id: number): string { return this.categories.find(category => category.id === id)?.name ?? 'دسته‌بندی نامشخص'; }
}
