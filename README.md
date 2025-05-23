# Simple Book Management System

A full-stack web application for managing a collection of books with complete CRUD operations. Built with .NET Web API backend and Angular frontend.

## 🚀 Features

- **Add Books**: Create new books with title, author, ISBN, and publication year
- **View Books**: Display all books in a responsive table format
- **Update Books**: Edit existing book information
- **Delete Books**: Remove books from the collection with confirmation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **RESTful API**: Clean API endpoints for all operations
- **Data Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback

## 🏗️ Technology Stack

### Backend
- **.NET 6/7/8 Web API**
- **Entity Framework Core** (Database ORM)
- **Postman** (API documentation)

### Frontend
- **Angular 15+**
- **TypeScript**
- **Bootstrap** (Responsive design)

## 📁 Project Structure

```
Simple_Book_Management_System/
├── backend/
│   ├── Controllers/
│   │   └── BooksController.cs
│   ├── Models/
│   │   └── Book.cs
│   ├── Data/
│   │   └── BookContext.cs
│   ├── DTOs/
│   │   ├── BookDto.cs
│   │   └── CreateBookDto.cs
│   ├── Services/
│   │   └── BookService.cs
│   ├── Program.cs
│   └── appsettings.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── app.module.ts
│   │   ├── assets/
│   │   └── environments/
│   ├── angular.json
│   └── package.json
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

**Backend:**
- .NET 6.0 SDK or higher
- SQL Server or SQL Server Express
- Visual Studio 2022 or VS Code

**Frontend:**
- Node.js (v16 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shevon2000/Simple_Book_Management_System.git
   cd Simple_Book_Management_System
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   
   # Restore NuGet packages
   dotnet restore
   
   # Update database connection string in appsettings.json
   # Run database migrations
   dotnet ef database update
   
   # Run the API
   dotnet run
   ```
   The API will be available at `https://localhost:5001` (or check console output)

3. **Frontend Setup:**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Update API URL in environment files if needed
   # Start the development server
   ng serve
   ```
   The application will be available at `http://localhost:4200`

## 🔌 API Endpoints

### Books Controller

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/{id}` | Get book by ID |
| POST | `/api/books` | Create new book |
| PUT | `/api/books/{id}` | Update existing book |
| DELETE | `/api/books/{id}` | Delete book |
| GET | `/api/books/search?query={term}` | Search books |

### Sample API Request/Response

**POST /api/books**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "publicationYear": 1925
}
```

**Response:**
```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "publicationYear": 1925,
  "createdDate": "2024-01-15T10:30:00Z"
}
```

## 📱 Frontend Features

### Components
- **Book List**: Display all books in a data table
- **Book Form**: Add/Edit book modal with validation
- **Book Details**: View detailed information
- **Confirmation Dialog**: Delete confirmation

### Services
- **BookService**: HTTP client service for API communication
- **NotificationService**: Toast notifications for user feedback

## 🔧 Configuration

### Backend Configuration (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=BookManagementDB;Trusted_Connection=true;"
  },
  "Cors": {
    "AllowedOrigins": ["http://localhost:4200"]
  }
}
```

### Frontend Configuration (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

## 🚧 Future Enhancements

- **Authentication & Authorization** (JWT tokens)
- **User Management** system
- **Book Categories** and genres
- **Advanced Search** with filters
- **File Upload** for book covers
- **Export Functionality** (PDF, Excel)
- **Pagination** for large datasets
- **Real-time Updates** with SignalR
- **Docker** containerization

## 👨‍💻 Author

**Shevon** - [shevon2000](https://github.com/shevon2000)

## 🙏 Acknowledgments

- ASP.NET Core team for excellent documentation
- Angular team for the robust framework
- Entity Framework Core for seamless data access
- Angular Material for beautiful UI components

---

📧 For questions or support, please open an issue on the GitHub repository.
