import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
  imports: [CommonModule]
})
export class BookCardComponent implements OnInit {
  @Input() book: any;

  ngOnInit() {
    if (this.book?.coverBlob) {
      this.book.coverUrl = this.decodeBlobToBase64(this.book.coverBlob);
    }
  }

  private decodeBlobToBase64(blob: string): string {
    // Assuming the blob is already Base64-encoded from the backend
    return `data:image/jpeg;base64,${blob}`;  }
}