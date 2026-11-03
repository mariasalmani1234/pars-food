export type UserRole =
  | 'customer'
  | 'restaurant'
  | 'admin';


export interface User {

  id: number;

  name: string;

  email: string;

  password: string;

  phone: string;

  role: UserRole;

  restaurantId?: number;

}