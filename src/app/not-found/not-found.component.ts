  import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-not-found',
    standalone: true,
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  export class NotFoundComponent {
    constructor(private router: Router) {}

    goHome() {
      this.router.navigate(['/home']);
    }
  }
