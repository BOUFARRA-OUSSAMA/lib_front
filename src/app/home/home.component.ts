import { Component, CUSTOM_ELEMENTS_SCHEMA,OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { BookService } from '../services/BookService';
registerSwiperElements();
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit{
  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadLatestBooks();
  }

  private loadLatestBooks(): void {
    this.bookService.getLatestBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error fetching latest books:', error);
      }
    );
  }
}
