import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from './icon.component';

@Component({ selector: 'app-workspace-header', standalone: true, imports: [RouterLink, IconComponent],
  template: `<header><div><a routerLink="/profile" class="eyebrow">پارس فود <span>/ {{section}}</span></a><h1>{{title}}</h1><p>{{description}}</p></div><ng-content/></header>`,
  styles: [`:host{display:block;margin-bottom:28px;}header{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-block:32px 24px;border-bottom:1px solid var(--border);}.eyebrow{display:inline-flex;align-items:center;min-height:44px;margin:0;color:var(--primary-dark);font-size:13px;font-weight:700;text-decoration:none;}.eyebrow span{color:var(--text-light);font-weight:400;margin-inline-start:8px;}h1{font-size:32px;line-height:1.5;margin:8px 0;color:var(--surface-dark);letter-spacing:-.6px;}p{color:var(--text-light);font-size:14px;margin:0;}@media(max-width:600px){header{padding-block:24px 20px;gap:16px;align-items:flex-start;flex-wrap:wrap;}h1{font-size:27px;}:host{margin-bottom:22px;}}`]
})
export class WorkspaceHeaderComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() section = 'حساب کاربری';
}
