# Collegedunia Book API

## Follow these steps to set up and run the project locally.

You can find the project on Github
https://github.com/sahaj122/collegedunia-book-api.git

(Please clone the git repo if any the uploaded file has some issues)

#### Navigate to the project directory:
cd COLLEGEDUNIA

#### Install dependencies
npm install

#### Set up the environment variables
  Create a .env file in the root directory of your project and add the following environment variables:
  Specify the following variables in the .env file

  `MONGO_URI`=<your-mongodb-connection-string>
  `PORT`=<port-number>
  `CORS_ORIGIN`=<allowed-origin> (use '*' to allow all)

####  Run the Application
Start the server using nodemon for automatic restarts during development:
  npm run dev

Alternatively, you can start the server in production mode with:
  npm start

#### API Endpoints
Here are the available API endpoints:

1) POST /api/books: Create a new book entry.
  Request Body: JSON object with title, author, isbn, and publishedDate.

2) GET /api/books: Retrieve a list of all books.
  Query Parameters: Supports title, author, limit, skip, and sort.

3) GET /api/books/:id: Retrieve details of a specific book by its ID.

4) PUT /api/books/:id: Update a book's information by its ID.
  Request Body: JSON object with fields to be updated (e.g., title, author).

5) DELETE /api/books/:id: Delete a specific book by its ID.




