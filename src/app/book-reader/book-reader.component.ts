import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/BookService';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.css'],
})
export class BookReaderComponent implements OnInit {
  bookId!: number;
  currentPage = 1;   // Placeholder if you do custom pagination later
  totalPages = 10;   // Placeholder until we do real page logic

  pdfUrl: SafeResourceUrl = '';  // A blob URL to display in an <iframe>
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Capture the Book ID from the URL: /book/:id/read
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch the PDF from the backend
    this.loadPdf();
  }

  loadPdf(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.bookService.getBookPdf(this.bookId).subscribe({
      next: (pdfBlob) => {
        const objectUrl = URL.createObjectURL(pdfBlob);
        // Bypass Angular's security to allow a blob: URL
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading PDF:', error);
        this.errorMessage = 'Unable to load PDF. Please try again later.';
        this.isLoading = false;
      },
    });
    
  }

  nextPage(): void {
    // If you want real page-by-page logic, implement it here
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // For an entire PDF in an iframe, there's nothing to do
      // But if you do server-side page extraction, you'd call that here
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      // Same as above: you'd call a service method to load a different page
    }
  }
}
