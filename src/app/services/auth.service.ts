import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SessionUser, User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserKey = 'pars-food-current-user';

  constructor(private userService: UserService) {}

  login(email: string, password: string): Observable<SessionUser | null> {
    return this.userService.login(email, password).pipe(
      map(users => users[0] ? this.toSessionUser(users[0]) : null),
      tap(user => {
        if (user) localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      })
    );
  }

  register(user: Omit<User, 'id'>): Observable<User> {
    return this.userService.register(user);
  }

  getCurrentUser(): SessionUser | null {
    try {
      const data = localStorage.getItem(this.currentUserKey);
      const user = data ? JSON.parse(data) : null;
      if (!user || !Number.isSafeInteger(user.id) || typeof user.name !== 'string' ||
          typeof user.email !== 'string' || !['customer', 'restaurant', 'admin'].includes(user.role)) {
        return null;
      }
      const session = this.toSessionUser(user);
      if ('password' in user) localStorage.setItem(this.currentUserKey, JSON.stringify(session));
      return session;
    } catch {
      return null;
    }
  }

  logout(): void { localStorage.removeItem(this.currentUserKey); }
  isLoggedIn(): boolean { return this.getCurrentUser() !== null; }
  hasRole(role: string): boolean { return this.getCurrentUser()?.role === role; }

  private toSessionUser(user: User): SessionUser {
    return { id: user.id, name: user.name, email: user.email,
      phone: user.phone ?? '', role: user.role, restaurantId: user.restaurantId };
  }
}
