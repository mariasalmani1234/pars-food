export type UserRole =
  | 'customer'
  | 'restaurant'
  | 'admin';

export type SessionUser = Omit<User, 'password'>;


export interface User {

  id: number;

  name: string;

  email: string;

  password: string;

  phone: string;

  role: UserRole;

  restaurantId?: number;

}