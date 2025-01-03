import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Base URL for user-related endpoints, matching your backend’s /api/users
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  /**
   * Fetch a single user by its ID.
   * @param id The user's ID.
   */
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  /**
   * Create a new user (if you need a direct method, though typically done via Auth).
   * @param userData The user data to create.
   */
  createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, userData);
  }

  /**
   * Update an existing user.
   * @param id The user’s ID to update.
   * @param userData The updated user data.
   */
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, userData);
  }

  /**
   * Delete a user by its ID.
   * @param id The user’s ID to delete.
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // uploadProfilePicture(userId: number, file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post(`${this.baseUrl}/${userId}/upload-profile-picture`, formData);
  // }

  changePassword(userId: number, newPassword: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${userId}/change-password`, { newPassword });
  }
}
