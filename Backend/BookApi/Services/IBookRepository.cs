using System.Collections.Generic;
using BookApi.Models;

namespace BookApi.Services
{
    public interface IBookRepository
    {
        List<Book> GetAll();
        Book? GetById(int id);
        Book Add(Book book);
        Book? Update(Book book);
        bool Delete(int id);
    }
}