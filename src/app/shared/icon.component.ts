import { Component, Input } from '@angular/core';
@Component({selector:'app-icon',standalone:true,template:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path [attr.d]="paths[name] || paths['utensils']"/></svg>`,styles:[`:host{display:inline-flex;width:1.3em;height:1.3em;flex:none;}svg{width:100%;height:100%;}`]})
export class IconComponent {
  @Input() name = 'utensils';
  readonly paths:Record<string,string> = {
    eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    'eye-off':'m3 3 18 18M9 5.5A12 12 0 0 1 12 5c6 0 10 7 10 7a18 18 0 0 1-3 3.8M6 6.5A22 22 0 0 0 2 12s4 7 10 7a12 12 0 0 0 5-1.2M10 10a3 3 0 0 0 4 4',
    plus:'M12 5v14M5 12h14',
    minus:'M5 12h14',
    close:'m6 6 12 12M18 6 6 18',
    search:'m21 21-4.3-4.3M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z',
    arrow:'M19 12H5m6-6-6 6 6 6',
    cart:'M3 3h2l2.3 12h11.4l2-8H6M10 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z',
    pin:'M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0Zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    star:'m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z',
    clock:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-5v5l3 2',
    user:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2',
    burger:'M3 9c0-8 18-8 18 0H3Zm-1 5 4 2 4-2 4 2 4-2 4 2M3 11h18M3 19h18v2H3v-2ZM8 5h.1M12 4h.1M16 5h.1',
    pizza:'m3 21 6-18c6 1 11 6 12 12L3 21ZM8 6c5 1 9 5 10 10M10 11h.1M8 16h.1M14 15h.1',
    chicken:'M8 13a6 6 0 1 1 8-8 6 6 0 0 1-3 9l-4 4a3 3 0 1 1-5-2l4-3Z',
    drink:'M6 8h12l-2 13H8L6 8Zm-1 0h14M12 8l2-6h5M10 12h4',
    check:'m5 12 4 4L19 6',
    utensils:'M4 3v6c0 3 6 3 6 0V3M7 3v18M20 3c-5 2-5 10 0 10V3Zm0 10v8',
    grid:'M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z'
  };
}
