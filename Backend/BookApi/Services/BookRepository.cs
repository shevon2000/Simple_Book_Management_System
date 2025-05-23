using System;
using System.Collections.Generic;
using System.Linq;
using BookApi.Models;

namespace BookApi.Services
{
    public class BookRepository : IBookRepository
    {
        private readonly List<Book> _books;
        private int _nextId = 1;

        public BookRepository()
        {
            // Initialize with some sample data
            _books = new List<Book>
            {
                new Book { Id = _nextId++, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", ISBN = "9780743273565", PublicationDate = new DateTime(1925, 4, 10) },
                new Book { Id = _nextId++, Title = "To Kill a Mockingbird", Author = "Harper Lee", ISBN = "9780061120084", PublicationDate = new DateTime(1960, 7, 11) },
                new Book { Id = _nextId++, Title = "1984", Author = "George Orwell", ISBN = "9780451524935", PublicationDate = new DateTime(1949, 6, 8) }
            };
        }

        public List<Book> GetAll()
        {
            return _books;
        }

        public Book? GetById(int id)
        {
            return _books.FirstOrDefault(b => b.Id == id);
        }

        public Book Add(Book book)
        {
            book.Id = _nextId++;
            _books.Add(book);
            return book;
        }

        public Book? Update(Book book)
        {
            var existingBook = _books.FirstOrDefault(b => b.Id == book.Id);
            if (existingBook == null)
                return null;

            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.ISBN = book.ISBN;
            existingBook.PublicationDate = book.PublicationDate;
            
            return existingBook;
        }

        public bool Delete(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null)
                return false;
                
            return _books.Remove(book);
        }
    }
}