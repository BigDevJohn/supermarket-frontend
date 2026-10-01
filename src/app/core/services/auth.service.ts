import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/supermarket/auth';
  private readonly http = inject(HttpClient);


  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem('auth', JSON.stringify(response.token));
        }),
      );
  }

  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem('auth', JSON.stringify(response.token));
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('auth');
    
  }

  getAuth(): AuthResponse | null {
    const auth = localStorage.getItem('auth');
    return auth ? JSON.parse(auth) : null;
  }
}
