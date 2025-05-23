using BookApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Register our repository service
builder.Services.AddSingleton<IBookRepository, BookRepository>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder => builder
            .WithOrigins("http://localhost:4200") // Angular app default URL
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

app.UseHttpsRedirection();

// Use CORS policy
app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();