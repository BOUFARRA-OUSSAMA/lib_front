import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/categories'; // Adjust based on your backend API

  constructor(private http: HttpClient) {}

  /**
   * Fetch all categories.
   * Returns an array of categories with `id` and `name`.
   */
  getAllCategories(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(this.baseUrl);
  }

  /**
   * Fetch a single category by its ID.
   * @param id The ID of the category.
   */
  getCategoryById(id: number): Observable<{ id: number; name: string }> {
    return this.http.get<{ id: number; name: string }>(`${this.baseUrl}/${id}`);
  }

  /**
   * Create a new category.
   * @param categoryData The category data to create.
   */
  createCategory(categoryData: { name: string }): Observable<{ id: number; name: string }> {
    return this.http.post<{ id: number; name: string }>(this.baseUrl, categoryData);
  }

  /**
   * Update an existing category.
   * @param id The ID of the category to update.
   * @param categoryData The updated category data.
   */
  updateCategory(id: number, categoryData: { name: string }): Observable<{ id: number; name: string }> {
    return this.http.put<{ id: number; name: string }>(`${this.baseUrl}/${id}`, categoryData);
  }

  /**
   * Delete a category by its ID.
   * @param id The ID of the category to delete.
   */
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCategoriesWithCounts(): Observable<{ name: string; totalBooks: number }[]> {
    return this.http.get<{ name: string; totalBooks: number }[]>('http://localhost:8080/api/categories');
  }
  
}
