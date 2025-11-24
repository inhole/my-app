import { Request, Response } from 'express';
import * as bookService from '../services/bookService';

const getAllBooks = (req: Request, res: Response): void => {
  try {
    const books = bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const createBook = (req: Request, res: Response): void => {
  try {
    const { title, author, publishedDate } = req.body;
    const newBook = bookService.createBook({ title, author, publishedDate });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const getBookById = (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);
    const book = bookService.getBookById(id);
    res.json(book);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

const updateBook = (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);
    const { title, author, publishedDate } = req.body;
    const updatedBook = bookService.updateBook(id, { title, author, publishedDate });
    res.json(updatedBook);
  } catch (error) {
    if ((error as Error).message === '도서를 찾을 수 없습니다.') {
      res.status(404).json({ error: (error as Error).message });
    } else {
      res.status(400).json({ error: (error as Error).message });
    }
  }
};

const deleteBook = (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);
    bookService.deleteBook(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
};
