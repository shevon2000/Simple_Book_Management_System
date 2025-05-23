import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { BookFormComponent } from './book-form.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookFormComponent],
  template: `
    <div class="container">
      <h2>Book List</h2>
      <div class="row mb-3">
        <div class="col">
          <button class="btn btn-teal" (click)="createNewBook()">Add New Book</button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Publication Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let book of books">
                <td>{{ book.id }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.isbn }}</td>
                <td>{{ book.publicationDate | date:'mediumDate' }}</td>
                <td>
                  <button class="btn btn-sm btn-warning me-2" (click)="editBook(book)">Edit</button>
                  <button class="btn btn-sm btn-danger" (click)="deleteBook(book.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div *ngIf="books.length === 0" class="alert alert-info">
            No books available.
          </div>
        </div>

        <div class="col-md-4" *ngIf="selectedBook">
          <app-book-form 
            [book]="selectedBook" 
            [isEditing]="isEditing"
            (bookSaved)="loadBooks()"
            (cancelled)="clearSelection()">
          </app-book-form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  isEditing = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (error) => {
        console.error('Error loading books', error);
      }
    });
  }

  editBook(book: Book): void {
    this.selectedBook = { ...book };
    this.isEditing = true;
  }

  createNewBook(): void {
    this.selectedBook = new Book();
    this.isEditing = false;
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks();
          if (this.selectedBook && this.selectedBook.id === id) {
            this.selectedBook = null;
          }
        },
        error: (error) => {
          console.error('Error deleting book', error);
        }
      });
    }
  }

  clearSelection(): void {
    this.selectedBook = null;
  }
}