# Bookkeeping Service

A RESTful API for managing books, users, and libraries using Express.js and MongoDB. This service allows for CRUD operations on books and libraries, user authentication, and book borrowing with integration to Cloudinary for image storage.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Books**: Create, read, update, and delete book records. Associate books with authors and libraries.
- **Users**: Register, log in, and authenticate users. Users can be authors or borrowers.
- **Libraries**: Manage library records and their book inventories.
- **Borrowing**: Borrow and return books with tracking.
- **Image Storage**: Store book cover images in Cloudinary.
- **Multilingual Support**: API responses in English and Hindi.

## Technologies

- **Backend Framework**: Express.js
- **Database**: MongoDB
- **Image Storage**: Cloudinary
- **Authentication**: JWT
- **File Upload**: Multer
- **Cloud Storage**: Cloudinary
- **Testing**: Postman

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/santoshpatil1512/book-keeping-service-.git
   cd bookkeeping-service



2. **Install Dependencies:**:


npm install


3. **Environment Variables:**:

Create a .env file in the root directory and add the following variables:

env

MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret

4. **Create the Uploads Directory:**:

Ensure that an uploads directory exists in the root of the project for storing temporary files:

mkdir uploads

Configuration

Mongoose: Configured to connect to MongoDB.
Cloudinary: Set up for image uploads and management.
JWT: For user authentication and authorization.

Usage

1. **Start the Server:**
npm start


The server will run on http://localhost:3000.

2. **API Documentation:**

Use Postman or similar tools to test the endpoints. Import the Postman collection provided in the docs folder for pre-configured tests.


Endpoints

Books

GET /api/books: Retrieve a list of all books.
GET /api/books/:id: Retrieve details of a specific book by its ID.
POST /api/books: Create a new book entry.
PUT /api/books/:id: Update details of a specific book.
DELETE /api/books/:id: Delete a book by its ID.

Users

POST /api/users/register: Register a new user.
POST /api/users/login: Authenticate user and generate JWT token.
Borrowing
POST /api/borrow: Borrow a book.
PUT /api/return/:id: Return a borrowed book.

Libraries

GET /api/libraries: Retrieve a list of all libraries.
GET /api/libraries/:id: Retrieve details of a specific library.
POST /api/libraries: Create a new library.
PUT /api/libraries/:id: Update details of a specific library.
DELETE /api/libraries/:id: Delete a library by its ID.

Library Inventory

GET /api/libraries/:id/inventory: Retrieve a list of books available in a specific library.
POST /api/libraries/:id/inventory: Add a book to the inventory of a specific library.
DELETE /api/libraries/:id/inventory/:bookId: Remove a book from the inventory of a specific library.


Testing

1. **Use Postman:**

Import the Postman collection from the docs folder to test the API endpoints.

2. **Run Tests:**

You can manually test endpoints using Postman or create automated tests as needed.

Contributing
Feel free to open issues or submit pull requests. Please follow the coding standards and ensure tests are added for new features.


### Instructions:

1. **Update URLs and Configuration Values**: Replace `https://github.com/your-username/bookkeeping-service.git` with your actual GitHub repository URL. Replace the placeholders in the `.env` section with your actual configuration values.

2. **Add the `docs` Folder**: If you mention a `docs` folder, make sure it contains your Postman collection or any other relevant documentation.

This `README.md` should help guide users through setting up, using, and contributing to your project.
