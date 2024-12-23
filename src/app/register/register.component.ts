import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup,Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { email, username, password, confirmPassword } = this.registerForm.value;
      if (password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      const userData = { email, username, password };

      this.authService.register(userData).subscribe({
        next: (response: any) => {
          // Handle successful registration
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          // Handle registration failure
          console.error('Registration failed:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'All fields are required.';
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

  toggleConfirmPasswordVisibility() {
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
    const toggleConfirmPasswordIcon = document.getElementById('toggleConfirmPassword') as HTMLElement;
    if (confirmPasswordInput.type === 'password') {
      confirmPasswordInput.type = 'text';
      toggleConfirmPasswordIcon.classList.remove('fa-eye');
      toggleConfirmPasswordIcon.classList.add('fa-eye-slash');
    } else {
      confirmPasswordInput.type = 'password';
      toggleConfirmPasswordIcon.classList.remove('fa-eye-slash');
      toggleConfirmPasswordIcon.classList.add('fa-eye');
    }
  }
  closeNotification(): void {
    this.errorMessage = null;
  }
}