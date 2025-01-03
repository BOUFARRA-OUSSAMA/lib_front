import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LibraryComponent } from './library/library.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import { BookReaderComponent } from './book-reader/book-reader.component';
import { ProfileComponent } from './profile/profile.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'library',component: LibraryComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'book/:id', component: BookDetailsComponent }, // Add this route
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: 'book/:id/read', component: BookReaderComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: NotFoundComponent }
];