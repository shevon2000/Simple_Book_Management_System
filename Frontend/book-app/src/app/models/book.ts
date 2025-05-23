export class Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: Date;

  constructor() {
    this.id = 0;
    this.title = '';
    this.author = '';
    this.isbn = '';
    this.publicationDate = new Date();
  }
}