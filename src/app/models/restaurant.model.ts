export interface Restaurant {

  id:number;

  name:string;

  city:string;

  rate:number;

  image:string;

  address:string;

  description:string;

  isOpen:boolean;
  deliveryTime?:number;
}