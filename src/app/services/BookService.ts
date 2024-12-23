import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api/books'; // Adjust based on your backend endpoint structure

  constructor(private http: HttpClient) {}

  // private getAuthToken(): string | null {
  //   return sessionStorage.getItem('authToken'); // Retrieve the token from sessionStorage
  // }

  getAllBooks(page: number = 0, size: number = 10): Observable<any> {
    // // const authToken = this.getAuthToken();
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${authToken}`
    // });
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getLatestBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/latest`);
  }

  getBookById(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${bookId}`);
  }

  searchBooks(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search?title=${query}`);
  }

  createBook(bookData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, bookData);
  }

  updateBook(bookId: number, bookData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${bookId}`, bookData);
  }

  deleteBook(bookId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${bookId}`);
  }

  // private createAuthHeaders(): HttpHeaders {
  //   // const token = this.getAuthToken();
  // //   let headers = new HttpHeaders();
  // //   if (token) {
  // //     headers = headers.set('Authorization', `Bearer ${token}`);
  // //   }
  // //   return headers;
  //  }
}