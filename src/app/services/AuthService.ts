import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  // BehaviorSubject to manage user state
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Initialize user state from localStorage if available
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  /**
   * Login the user and save their token and details
   */
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const loginData = { username, password };

    return this.http.post(`${this.baseUrl}/login`, loginData, { headers }).pipe(
      tap((response: any) => {
        if (response.token) {
          const user = {
            id: response.id,
            username: response.username,
            email: response.email,
            isPremium: response.isPremium,
            profilePicture: response.profilePicture,
            token: response.token
          };
          this.setUser(user);
          sessionStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  /**
   * Register a new user
   */
  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.baseUrl}/register`, userData, { headers });
  }

  /**
   * Logout the user by clearing stored data
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  /**
   * Get the current logged-in user's details
   */
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Check if a user is currently logged in
   */
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  /**
   * Private helper to save user data and update state
   */
  private setUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
