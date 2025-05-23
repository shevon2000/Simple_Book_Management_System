using System;

namespace BookApi.DTOs
{
    public class CreateBookDto
    {
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required string ISBN { get; set; }
        public DateTime PublicationDate { get; set; }
    }
}