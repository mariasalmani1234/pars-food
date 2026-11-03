import { Component, Input } from '@angular/core';
import { orderStatusText } from './order-presentation';

@Component({ selector: 'app-order-status', standalone: true,
  template: `<span [attr.data-status]="status"><i aria-hidden="true"></i>{{label(status)}}</span>`,
  styles: [`:host{display:inline-flex;}span{display:inline-flex;gap:7px;align-items:center;padding:5px 10px;font-size:12px;font-weight:650;border-radius:7px;background:#f0edf2;color:#54465c;white-space:nowrap;}i{width:6px;height:6px;background:currentColor;border-radius:50%;}span[data-status=pending]{background:#fff3db;color:#80520a;}span[data-status=accepted]{background:#e9f1ff;color:#23549a;}span[data-status=preparing]{background:var(--primary-light);color:var(--primary-dark);}span[data-status=delivered]{background:#e9f6ef;color:var(--success);}span[data-status=cancelled]{background:#fcebee;color:#a51f39;}`]
})
export class OrderStatusComponent { @Input() status = ''; readonly label = orderStatusText; }
