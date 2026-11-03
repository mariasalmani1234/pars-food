import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from './icon.component';
@Component({selector:'app-purchase-steps',standalone:true,imports:[RouterLink,IconComponent],template:`
  <ol aria-label="مراحل ثبت سفارش">
    @for(label of labels; track $index){
      <li [class.current]="step === $index + 1" [class.done]="step > $index + 1" [attr.aria-current]="step === $index + 1 ? 'step' : null">
        <span class="number" aria-hidden="true">@if(step > $index + 1){<app-icon name="check"/>}@else{{{($index + 1).toLocaleString('fa-IR')}}}</span>
        <span>{{label}}</span>
      </li>
    }
  </ol>`,styles:[`ol{display:flex;align-items:center;gap:28px;margin:0;padding:0;list-style:none;color:var(--text-light);font-size:14px}li{display:flex;align-items:center;gap:9px;white-space:nowrap}.number{display:grid;place-items:center;width:28px;height:28px;border:1px solid var(--border);border-radius:50%;font-size:13px;background:#fff}.current{color:var(--primary-dark);font-weight:700}.current .number{background:var(--primary-dark);border-color:var(--primary-dark);color:#fff}.done .number{color:var(--success);background:#eff8f3;border-color:#cce3d6}.number app-icon{width:16px;height:16px}@media(max-width:500px){ol{justify-content:space-between;gap:8px;font-size:13px}li{gap:6px}.number{width:24px;height:24px;font-size:12px}}`]})
export class PurchaseStepsComponent {
  @Input() step=1;
  readonly labels=['سبد خرید','حساب کاربری','اطلاعات ارسال'];
}
