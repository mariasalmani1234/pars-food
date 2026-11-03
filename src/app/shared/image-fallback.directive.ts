import { Directive, ElementRef, HostListener, Input } from '@angular/core';

const fallback = 'assets/image/food-placeholder.svg';
const legacyImages: Record<string, string> = {
  'assets/images/بیف-لاین.jpg': 'assets/image/بیف لاین.webp',
  'assets/images/کاخ.jpg': 'assets/image/کاخ.jpeg',
  'assets/images/خروس.jpg': 'assets/image/خروس.png',
  'assets/images/pizza-special.jpg': 'assets/image/margarita.jfif',
  'assets/images/pepperoni.jpg': 'assets/image/images (2).jfif'
};

@Directive({ selector: 'img[appImage]', standalone: true })
export class ImageFallbackDirective {
  constructor(private element: ElementRef<HTMLImageElement>) {}
  @Input() set appImage(value: string | undefined | null) {
    this.element.nativeElement.src = value ? legacyImages[value] ??
      (value.startsWith('assets/images/') ? fallback : value) : fallback;
  }
  @HostListener('error') onError(): void {
    if (!this.element.nativeElement.src.endsWith(fallback)) this.element.nativeElement.src = fallback;
  }
}
