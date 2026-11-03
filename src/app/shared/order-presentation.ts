import { OrderStatus } from '../models/order.model';

export const ORDER_STATUSES: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'در انتظار تأیید' },
  { value: 'accepted', label: 'تأیید شده' },
  { value: 'preparing', label: 'در حال آماده‌سازی' },
  { value: 'delivered', label: 'تحویل داده شده' },
  { value: 'cancelled', label: 'لغو شده' }
];
export function orderStatusText(status: string): string {
  return ORDER_STATUSES.find(item => item.value === status)?.label ?? 'نامشخص';
}
export function persianNumber(value: number): string { return value.toLocaleString('fa-IR'); }
export function orderDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'تاریخ نامشخص' : new Intl.DateTimeFormat('fa-IR', {
    timeZone: 'Asia/Tehran', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(date);
}
