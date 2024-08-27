import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import Book from "../models/book.model.js"

// create a new book entry
const createBook = asyncHandler( async (req, res) => {
  
  const {title, author, isbn, publishedDate } = req.body

  if(
      [title, author, isbn].some((field) => field?.trim() === "")
  ) {
      throw new ApiError(400, "${field} is required")
  }

  const existedBook = await Book.findOne({ isbn });

  if(existedBook){
      throw new ApiError(409, "Book exists with same isbn code")
  }

  const book = await Book.create({
      title: title,
      author: author,
      isbn: isbn,
      publishedDate: publishedDate
  })

  const createdBook = await Book.findById(book._id)

  if(!createdBook){
      throw new ApiError(500, "Something went wrong while creating the BOOK ENTRY")
  }

  return res.status(201).json(
      new ApiResponse(200, createdBook, "Book registered Successfully")
  )
})

// Get all books
const getAllBooks = asyncHandler(async (req, res) => {

  // Extract page and limit from query parameters, with defaults
  const { page = 1, limit = 10, title, author, sortBy} = req.query;

  // Calculate the skip value (how many documents to skip)
  const skip = (page - 1) * limit;

  // Build the query object
  const query = {};
  if (title) {
    query.title = { $regex: title, $options: 'i' }; // 'i' makes it case-insensitive
  }
  if (author) {
    query.author = { $regex: author, $options: 'i' };
  }

  // Determine sorting options
  let sortOptions = {};
  if (sortBy) {
    const sortField = sortBy.startsWith('-') ? sortBy.substring(1) : sortBy;
    const sortOrder = sortBy.startsWith('-') ? -1 : 1;
    sortOptions[sortField] = sortOrder;
  }

    // Fetch the books with the given pagination parameters
    const books = await Book.find(query).limit(Number(limit)).skip(skip).sort(sortOptions);


  res.status(200).json(
    new ApiResponse(200, books, "Books Retrieved Successfully with given Search, Pagination and Sorting parameters")
  );
});

// Get a book by ID
const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.status(200).json(
    new ApiResponse(200, book, "Book Fetched Successfully !!")
  );
});

// Update a book by ID
const updateBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });

  if (!updatedBook) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.status(200).json(
    new ApiResponse(200, updatedBook, "Book Details Updated Successfully !!")
  );
});

// Delete a book by ID
const deleteBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedBook = await Book.findByIdAndDelete(id);

  if (!deletedBook) {
    return res.status(404).json(
      new ApiResponse(404,deletedBook, "Book Not Found")
    );
  }

  res.status(200).json(
    new ApiResponse(200,deletedBook,"Book Deleted Successfully")
  );
});

export {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById
}