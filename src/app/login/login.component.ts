import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService, private fb:FormBuilder) {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    });
  }

  onLogin() {
    if (this.loginForm.value.username && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        (response) => {
          // Handle successful login
          console.log('Login successful:', response);
          // Save the token if needed
          localStorage.setItem('authToken', response.token);
          // Navigate to the home page
          this.router.navigate(['/home']);
        },
        (error) => {
          // Handle login failure
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid username or password. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Username and password are required.';
    }
  }

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const togglePasswordIcon = document.getElementById('togglePassword') as HTMLElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordIcon.classList.remove('fa-eye');
      togglePasswordIcon.classList.add('fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      togglePasswordIcon.classList.remove('fa-eye-slash');
      togglePasswordIcon.classList.add('fa-eye');
    }
  }
  closeNotification(): void {
    this.errorMessage = null; // Clear the error message
  }
}
