using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BookApi.Models;
using BookApi.DTOs;
using BookApi.Services;

namespace BookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;

        public BooksController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        // GET: api/books
        [HttpGet]
        public ActionResult<IEnumerable<BookDto>> GetBooks()
        {
            var books = _bookRepository.GetAll();
            var bookDtos = books.Select(book => MapToDto(book)).ToList();
            return Ok(bookDtos);
        }

        // GET: api/books/5
        [HttpGet("{id}")]
        public ActionResult<BookDto> GetBook(int id)
        {
            var book = _bookRepository.GetById(id);

            if (book == null)
            {
                return NotFound();
            }

            return MapToDto(book);
        }

        // POST: api/books
        [HttpPost]
        public ActionResult<BookDto> CreateBook(CreateBookDto createBookDto)
        {
            var book = new Book
            {
                Title = createBookDto.Title,
                Author = createBookDto.Author,
                ISBN = createBookDto.ISBN,
                PublicationDate = createBookDto.PublicationDate
            };

            var newBook = _bookRepository.Add(book);
            
            return CreatedAtAction(nameof(GetBook), new { id = newBook.Id }, MapToDto(newBook));
        }

        // PUT: api/books/5
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, UpdateBookDto updateBookDto)
        {
            var existingBook = _bookRepository.GetById(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = updateBookDto.Title;
            existingBook.Author = updateBookDto.Author;
            existingBook.ISBN = updateBookDto.ISBN;
            existingBook.PublicationDate = updateBookDto.PublicationDate;

            var updatedBook = _bookRepository.Update(existingBook);
            
            return NoContent();
        }

        // DELETE: api/books/5
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _bookRepository.GetById(id);
            if (book == null)
            {
                return NotFound();
            }

            var result = _bookRepository.Delete(id);
            
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        private static BookDto MapToDto(Book book)
        {
            return new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                ISBN = book.ISBN,
                PublicationDate = book.PublicationDate
            };
        }
    }
}