import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <div class="card-header">
        {{ isEditing ? 'Edit Book' : 'Add New Book' }}
      </div>
      <div class="card-body">
        <form [formGroup]="bookForm" (ngSubmit)="onSubmit()">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input 
              type="text" 
              class="form-control" 
              id="title" 
              formControlName="title"
              [ngClass]="{ 'is-invalid': submitted && f['title'].errors }"
            >
            <div *ngIf="submitted && f['title'].errors" class="invalid-feedback">
              <div *ngIf="f['title'].errors['required']">Title is required</div>
            </div>
          </div>
          
          <div class="mb-3">
            <label for="author" class="form-label">Author</label>
            <input 
              type="text" 
              class="form-control" 
              id="author" 
              formControlName="author"
              [ngClass]="{ 'is-invalid': submitted && f['author'].errors }"
            >
            <div *ngIf="submitted && f['author'].errors" class="invalid-feedback">
              <div *ngIf="f['author'].errors['required']">Author is required</div>
            </div>
          </div>
          
          <div class="mb-3">
            <label for="isbn" class="form-label">ISBN</label>
            <input 
              type="text" 
              class="form-control" 
              id="isbn" 
              formControlName="isbn"
              [ngClass]="{ 'is-invalid': submitted && f['isbn'].errors }"
            >
            <div *ngIf="submitted && f['isbn'].errors" class="invalid-feedback">
              <div *ngIf="f['isbn'].errors['required']">ISBN is required</div>
            </div>
          </div>
          
          <div class="mb-3">
            <label for="publicationDate" class="form-label">Publication Date</label>
            <input 
              type="date" 
              class="form-control" 
              id="publicationDate" 
              formControlName="publicationDate"
              [ngClass]="{ 'is-invalid': submitted && f['publicationDate'].errors }"
            >
            <div *ngIf="submitted && f['publicationDate'].errors" class="invalid-feedback">
              <div *ngIf="f['publicationDate'].errors['required']">Publication Date is required</div>
            </div>
          </div>
          
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" class="btn btn-secondary me-md-2" (click)="onCancel()">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class BookFormComponent implements OnChanges {
  @Input() book: Book | null = null;
  @Input() isEditing = false;
  @Output() bookSaved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  bookForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book) {
      this.bookForm.patchValue({
        title: this.book.title,
        author: this.book.author,
        isbn: this.book.isbn,
        publicationDate: this.formatDateForInput(this.book.publicationDate)
      });
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      publicationDate: ['', [Validators.required]]
    });
  }

  formatDateForInput(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.bookForm.invalid || !this.book) {
      return;
    }

    const updatedBook: Book = {
      ...this.book,
      title: this.bookForm.value.title,
      author: this.bookForm.value.author,
      isbn: this.bookForm.value.isbn,
      publicationDate: new Date(this.bookForm.value.publicationDate)
    };

    if (this.isEditing) {
      this.bookService.updateBook(updatedBook).subscribe({
        next: () => {
          this.bookSaved.emit();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating book', error);
        }
      });
    } else {
      this.bookService.addBook(updatedBook).subscribe({
        next: () => {
          this.bookSaved.emit();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding book', error);
        }
      });
    }
  }

  resetForm(): void {
    this.submitted = false;
    this.bookForm.reset();
  }

  onCancel(): void {
    this.resetForm();
    this.cancelled.emit();
  }

  get f() { return this.bookForm.controls; }
}