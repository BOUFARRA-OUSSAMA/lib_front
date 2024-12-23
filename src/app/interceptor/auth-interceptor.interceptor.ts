import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/AuthService';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = sessionStorage.getItem('authToken');
  console.log('from interceptor authToken:', authToken);

  let request = req;
  if (authToken) {
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`, // Corrected template literal
      },
    });
    console.log('Request Headers:', request.headers);
  }

  // Forward the request and handle errors
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Unauthorized access - token might be invalid or expired.');
      }
      return throwError(() => error);
    })
  );
};