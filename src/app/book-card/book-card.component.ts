import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
  imports: [CommonModule, RouterModule],
})
export class BookCardComponent implements OnInit {
  @Input() book: any;

  ngOnInit() {
    if (this.book?.coverBlob) {
      this.book.coverImage = this.decodeBlobToBase64(this.book.coverBlob); // Convert blob to image URL
    }
  }

  private decodeBlobToBase64(blob: string): string {
    return `data:image/jpeg;base64,${blob}`; // Assuming the blob is Base64-encoded
  }
}
