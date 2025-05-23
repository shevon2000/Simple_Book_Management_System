using System;

namespace BookApi.DTOs
{
    public class BookDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required string ISBN { get; set; }
        public DateTime PublicationDate { get; set; }
    }
}