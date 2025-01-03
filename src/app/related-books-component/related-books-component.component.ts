import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../services/BookService';
import { Book } from '../interfaces/pagination';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-related-books',
  templateUrl: './related-books-component.component.html',
  styleUrls: ['./related-books-component.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class RelatedBooksComponent implements OnInit {
  @Input() categoryId!: number; // The category ID to fetch related books
  relatedBooks: Book[] = [];
  loading = false;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    if (this.categoryId) {
      this.fetchRelatedBooks();
    }
  }

  fetchRelatedBooks(): void {
    this.loading = true;
    this.bookService.getBooksByCategory(this.categoryId).subscribe({
      next: (books) => {
        this.relatedBooks = books;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching related books:', error.message);
        console.error('Full error:', error);
        this.loading = false;
      },
    });
  }

  goToBookDetails(bookId: number): void {
    this.router.navigate(['/book-details', bookId]);
  }
}
