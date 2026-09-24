# Movie CRUD App

A full-stack movie management application built with **ASP.NET Core Web API and React**. The application allows users to manage movie records, upload movie posters, and interact with a SQL Server database through a RESTful API.

This project demonstrates full-stack development using **C#, .NET, Entity Framework Core, SQL Server, React, and REST APIs**.

## Features

* View a list of movies
* Add new movies
* Edit existing movie details
* Delete movies
* Upload movie posters
* Display movie images through static file serving
* Pagination for movie listings
* React-based navigation and UI
* RESTful API integration
* SQL Server database integration
* Entity Framework Core for database operations
* AutoMapper for object mapping
* Swagger/OpenAPI API documentation
* CORS configuration for frontend-backend communication
* Responsive UI using Bootstrap and React-Bootstrap

## Tech Stack

### Frontend

* React 19
* JavaScript
* React Router
* React-Bootstrap
* Bootstrap 5
* React Select
* React Paginate
* Create React App
* HTML5
* CSS3

### Backend

* C#
* ASP.NET Core Web API
* .NET 8
* Entity Framework Core
* SQL Server
* AutoMapper
* REST APIs
* Swagger / OpenAPI
* CORS
* Static file handling

### Development Tools

* Visual Studio
* Visual Studio Code
* Git
* GitHub
* npm
* Swagger

## Project Structure

```text
movie-crud-app/
│
├── Demo/
│   └── react-crud-app/
│       ├── public/
│       ├── src/
│       ├── package.json
│       ├── package-lock.json
│       └── README.md
│
├── MovieAPIDemo/
│   ├── Image/
│   │   └── movie poster images
│   │
│   ├── MovieAPIDemo/
│   │   ├── Controllers/
│   │   ├── Data/
│   │   ├── Entities/
│   │   ├── DTOs/
│   │   ├── MappingProfiles.cs
│   │   ├── Program.cs
│   │   ├── appsettings.json
│   │   └── MovieAPIDemo.csproj
│   │
│   └── MovieAPIDemo.sln
│
└── .gitignore
```

## API

The backend exposes movie-related REST API endpoints through the `MovieController`.

### Movie API

Base route:

```text
/api/Movie
```

The API supports CRUD operations for movie records.

| Method | Endpoint          | Purpose                  |
| ------ | ----------------- | ------------------------ |
| GET    | `/api/Movie`      | Retrieve movies          |
| GET    | `/api/Movie/{id}` | Retrieve a movie by ID   |
| POST   | `/api/Movie`      | Create a new movie       |
| PUT    | `/api/Movie/{id}` | Update an existing movie |
| DELETE | `/api/Movie/{id}` | Delete a movie           |

### Movie Poster Upload

The application also provides a dedicated endpoint for uploading movie posters:

```text
POST /api/Movie/upload-movie-poster
```

Swagger can be used to explore and test the available API endpoints.

## Database

The application uses **SQL Server** with **Entity Framework Core**.

Entity Framework Core is responsible for:

* Connecting the application to SQL Server
* Mapping C# classes to database tables
* Reading movie records
* Creating new records
* Updating existing records
* Deleting records

The database connection is configured through the application's configuration files.

Before running the backend, update the database connection string to match your local SQL Server environment.

## Getting Started

### Prerequisites

Make sure you have installed:

* .NET 8 SDK
* Node.js and npm
* SQL Server
* Git

### 1. Clone the repository

```bash
git clone https://github.com/ShabihaS/movie-crud-app.git
cd movie-crud-app
```

### 2. Configure the database

Open the backend configuration:

```text
MovieAPIDemo/MovieAPIDemo/appsettings.json
```

Update the SQL Server connection string for your local environment.

### 3. Run the backend

Open Git Bash or a terminal and navigate to the backend project:

```bash
cd MovieAPIDemo/MovieAPIDemo
```

Run the application:

```bash
dotnet run
```

The API will start using the configured ASP.NET Core development URLs.

Swagger can then be used to test the API.

### 4. Run the React frontend

Open a second terminal:

```bash
cd Demo/react-crud-app
```

Install the dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

## Application Architecture

The application follows a client-server architecture:

```text
React Frontend
      │
      │ HTTP Requests
      ▼
ASP.NET Core Web API
      │
      │ Entity Framework Core
      ▼
SQL Server Database
```

Movie poster files are served separately through the ASP.NET Core static file configuration.

## Key Development Concepts

This project helped me develop practical experience with:

* Building RESTful APIs with ASP.NET Core
* Implementing CRUD operations
* Connecting a React frontend to a .NET backend
* Working with SQL Server databases
* Using Entity Framework Core
* Mapping objects with AutoMapper
* Handling file uploads
* Serving static files
* Configuring CORS
* Using Swagger for API testing and documentation
* Managing application state and navigation in React
* Implementing pagination
* Building reusable React components
* Managing a full-stack project with Git and GitHub

## What I Learned

Through this project, I gained hands-on experience building a complete application across both the frontend and backend.

I learned how a React application communicates with a REST API, how backend services interact with a relational database, and how CRUD operations connect the different layers of a full-stack application.

The project also strengthened my understanding of **C#, ASP.NET Core, Entity Framework Core, SQL Server, React, API integration, and Git/GitHub**.

## Future Improvements

Potential improvements include:

* User authentication and authorisation
* Movie search and filtering
* Improved form validation
* Better image upload and validation
* Responsive UI improvements
* Improved error handling
* API and frontend deployment
* Automated testing
* Environment-based configuration for API and database settings

## Author

**Shabiha S**

Junior Software Developer | Full-Stack Development

GitHub: [ShabihaS](https://github.com/ShabihaS)
