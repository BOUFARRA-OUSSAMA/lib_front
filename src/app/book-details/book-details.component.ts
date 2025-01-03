import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RelatedBooksComponent } from '../related-books-component/related-books-component.component';
import { BookService } from '../services/BookService';
import { Book } from '../interfaces/pagination';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, RelatedBooksComponent],
})
export class BookDetailsComponent implements OnInit {
  bookId!: number;
  book: Book | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchBookDetails();
  }

  fetchBookDetails(): void {
    this.loading = true;
    this.bookService.getBookById(this.bookId).subscribe({
      next: (book) => {
        this.book = book;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching book details:', error);
        this.loading = false;
      },
    });
  }

  /**
   * Navigate to the book-reading route
   */
  goToReader(): void {
    this.router.navigate(['/book', this.bookId, 'read']);
  }
}
