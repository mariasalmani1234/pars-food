import { CartItem } from './cart-item.model';


export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'delivered'
  | 'cancelled';



export interface Order {


  id:number;


  userId:number;


  items:CartItem[];


  totalPrice:number;


  address:string;


  phone:string;


  status:OrderStatus;


  createdAt:string;


}