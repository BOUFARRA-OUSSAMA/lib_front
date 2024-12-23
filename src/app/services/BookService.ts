import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api/books'; // Adjust based on your backend endpoint structure

  constructor(private http: HttpClient) {}

  /**
   * Private helper to get the token directly from localStorage
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken'); // Directly retrieve the token from localStorage
  }

  /**
   * Fetch the latest 12 books with auth token
   */
  getLatestBooks(): Observable<any[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/latest`, { headers });
  }

  /**
   * Fetch a book by its ID with auth token
   */
  getBookById(bookId: number): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/${bookId}`, { headers });
  }

  /**
   * Search books by title with auth token
   */
  searchBooks(query: string): Observable<any[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/search?title=${query}`, { headers });
  }

  /**
   * Helper to create HttpHeaders with Authorization token
   */
  private createAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}
