import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, NavbarComponent,FormsModule],
})
export class ProfileComponent implements OnInit {
  user: any = null; 
  loading: boolean = false; 
  errorMessage: string | null = null; 
  newPassword: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const userId = currentUser.id;
    this.loading = true;
    this.userService.getUserById(userId).subscribe({
      next: (fetchedUser) => {
        this.user = fetchedUser;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Unable to load user profile.';
        this.loading = false;
      },
    });
  }

  changePassword(): void {
    if (!this.newPassword) {
      this.errorMessage = 'New password cannot be empty.';
      return;
    }

    this.loading = true;
    this.userService.changePassword(this.user.id, this.newPassword).subscribe({
      next: () => {
        this.errorMessage = 'Password updated successfully.';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.error || 'Failed to update password.';
        this.loading = false;
      },
    });
  }
}