import {Router} from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} from '../controllers/book.controller.js';

const router = Router();

router.post('/books', createBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBookById);
router.delete('/books/:id', deleteBookById);

export default router;
