import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarComponent {
  isLoggedIn = false;
  user: any = null;
  defaultProfilePicture = 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/626fd8140423801.6241b91e24d9c.png';

  constructor(private authService: AuthService) {
    // Subscribe to user state changes
    this.authService.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
