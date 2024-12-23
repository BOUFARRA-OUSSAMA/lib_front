import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookService } from '../services/BookService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, BookCardComponent]
})
export class LibraryComponent implements OnInit {
  books: any[] = [];
  currentPage: number = 0;
  pageSize: number = 12;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  private loadBooks() {
    this.bookService.getAllBooks(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.books = response.content; // Assuming the response contains a 'content' field with the books
      },
      error: (error) => {
        console.error('Error loading books:', error);
      }
    });
  }
}