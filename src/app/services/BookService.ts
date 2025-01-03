import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Page, Book, PaginationParams } from '../interfaces/pagination';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  // Base URL for book-related endpoints (unchanged)
  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  getAllBooks(params: PaginationParams): Observable<Page<Book>> {
    const httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('size', params.size.toString());
    return this.http.get<Page<Book>>(`${this.baseUrl}`, { params: httpParams }).pipe(
      catchError((error) => {
        console.error('Error fetching books:', error);
        return throwError(() => error);
      })
    );
  }

  getLatestBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/latest`).pipe(
      catchError((error) => {
        console.error('Error fetching latest books:', error);
        return throwError(() => error);
      })
    );
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${bookId}`).pipe(
      catchError((error) => {
        console.error('Error fetching book by ID:', error);
        return throwError(() => error);
      })
    );
  }

  // ----------------------------------------------------------------
  // FIXED: Now points to /api/categories/{categoryId}/books
  // instead of /api/books/categories/{categoryId}/books
  // ----------------------------------------------------------------
  getBooksByCategory(categoryId: number): Observable<Book[]> {
    // Direct call to categories endpoint
    const url = `http://localhost:8080/api/categories/${categoryId}/books`;
    return this.http.get<Book[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching books by category:', error);
        return throwError(() => error);
      })
    );
  }
  // ----------------------------------------------------------------

  createBook(bookData: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, bookData).pipe(
      catchError((error) => {
        console.error('Error creating book:', error);
        return throwError(() => error);
      })
    );
  }

  updateBook(bookId: number, bookData: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${bookId}`, bookData).pipe(
      catchError((error) => {
        console.error('Error updating book:', error);
        return throwError(() => error);
      })
    );
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${bookId}`).pipe(
      catchError((error) => {
        console.error('Error deleting book:', error);
        return throwError(() => error);
      })
    );
  }

  searchBooksByTitle(title: string, page: number, size: number): Observable<Page<Book>> {
    const params = new HttpParams()
      .set('title', title)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Book>>(`${this.baseUrl}/search`, { params }).pipe(
      catchError((error) => {
        console.error('Error searching books by title:', error);
        return throwError(() => error);
      })
    );
  }

  searchBooksByAuthor(author: string, page: number, size: number): Observable<Page<Book>> {
    const params = new HttpParams()
      .set('author', author)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Book>>(`${this.baseUrl}/search`, { params }).pipe(
      catchError((error) => {
        console.error('Error searching books by author:', error);
        return throwError(() => error);
      })
    );
  }

  searchBooksByCategory(category: string, page: number, size: number): Observable<Page<Book>> {
    const params = new HttpParams()
      .set('category', category)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Book>>(`${this.baseUrl}/search`, { params }).pipe(
      catchError((error) => {
        console.error('Error searching books by category:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Fetch the raw PDF of the specified book as a Blob.
   * This calls GET /api/books/{bookId}/content.
   */
  getBookPdf(bookId: number): Observable<Blob> {
    return this.http
      .get(`${this.baseUrl}/${bookId}/content`, { responseType: 'blob' })
      .pipe(
        catchError((error) => {
          console.error('Error fetching PDF content:', error);
          return throwError(() => error);
        })
      );
  }
}
