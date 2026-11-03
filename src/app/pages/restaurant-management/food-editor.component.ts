import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { IconComponent } from '../../shared/icon.component';

export interface FoodDraft { name: string; description: string; image: string; price: number | null; categoryId: number | null; }
@Component({ selector: 'app-food-editor', standalone: true, imports: [FormsModule, IconComponent],
  templateUrl: './food-editor.component.html', styleUrl: './food-editor.component.css' })
export class FoodEditorComponent {
  @Input({required:true}) draft!: FoodDraft;
  @Input() categories: Category[] = [];
  @Input() editing = false; @Input() saving = false; @Input() categoriesLoading = false;
  @Input() categoryError = ''; @Input() errorMessage = '';
  @Output() save = new EventEmitter<void>(); @Output() cancel = new EventEmitter<void>();
  @Output() retryCategories = new EventEmitter<void>();
  @ViewChild('nameInput') nameInput?: ElementRef<HTMLInputElement>;
  focusName(): void {
    const input = this.nameInput?.nativeElement;
    if (!input) return;
    input.focus({preventScroll: true});
    input.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center'});
  }
}
