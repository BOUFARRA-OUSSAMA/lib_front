import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { BookService } from '../services/BookService';
import { Book, Page, PaginationParams } from '../interfaces/pagination';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, BookCardComponent, SearchBarComponent],
})
export class LibraryComponent implements OnInit {
  books: Book[] = [];     // List of books to display
  allBooks: Book[] = [];  // To store all books fetched initially (if needed for local filtering)
  currentPage = 0;        // Current page for pagination
  pageSize = 12;          // Number of books per page
  totalPages = 0;         // Total number of pages
  totalElements = 0;      // Total number of elements in the result
  loading = false;        // Loading indicator for API requests

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks(); // Load all books initially
  }

  /**
   * Fetch books from the server with pagination.
   */
  loadBooks(): void {
    this.loading = true;

    const params: PaginationParams = {
      page: this.currentPage,
      size: this.pageSize,
    };

    this.bookService.getAllBooks(params).subscribe({
      next: (response: Page<Book>) => {
        this.books = response.content;
        this.allBooks = [...this.books]; // Store a copy if you need local fallback
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.loading = false;
      },
    });
  }

  /**
   * Handle pagination button click to navigate pages.
   */
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBooks();
  }

  /**
   * Handle search functionality when user types in the search bar.
   */
  onSearch(searchQuery: string): void {
    // If search is empty, revert to initial data
    if (!searchQuery) {
      // Reset to original data if you want to display everything again
      this.currentPage = 0;  // Also reset page to 0
      this.books = [...this.allBooks];
      // Recalculate total pages locally
      this.totalPages = Math.ceil(this.allBooks.length / this.pageSize);
      this.totalElements = this.allBooks.length;
      return;
    }

    // For a new search, always start from the first page
    this.currentPage = 0;
    this.loading = true;

    this.bookService.searchBooksByTitle(searchQuery, this.currentPage, this.pageSize).subscribe({
      next: (response: Page<Book>) => {
        this.books = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error performing search:', error);
        this.loading = false;
      },
    });
  }

  /**
   * Generate array of page indices for pagination buttons.
   */
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
