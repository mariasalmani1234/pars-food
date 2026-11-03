import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  register(user: Omit<User, 'id'>): Observable<User> {
    const email = user.email.trim().toLowerCase();
    return this.getUsers().pipe(switchMap(users => {
      if (users.some(existing => existing.email.trim().toLowerCase() === email)) {
        return throwError(() => new Error('EMAIL_EXISTS'));
      }
      return this.http.post<User>(this.apiUrl, { ...user, name: user.name.trim(), email });
    }));
  }

  getUsers(): Observable<User[]> { return this.http.get<User[]>(this.apiUrl); }

  // json-server is a development API; real authentication requires a server session.
  login(email: string, password: string): Observable<User[]> {
    const normalizedEmail = email.trim().toLowerCase();
    return this.getUsers().pipe(map(users => users.filter(user =>
      user.email.trim().toLowerCase() === normalizedEmail && user.password === password
    )));
  }
}
