import { Request, Response } from 'express';

interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
}

// 도서 데이터 저장 (메모리 기반)
let books: Book[] = [];
let nextId: number = 1;

const getAllBooks = (req: Request, res: Response): void => {
  res.json(books);
};

const createBook = (req: Request, res: Response): void => {
  const { title, author, publishedDate } = req.body;
  if (!title || !author || !publishedDate) {
    res.status(400).json({ error: '모든 필드를 입력해야 합니다.' });
    return;
  }

  const newBook = {
    id: nextId++,
    title,
    author,
    publishedDate,
  };
  books.push(newBook);
  res.status(201).json(newBook);
};

const getBookById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    res.status(404).json({ error: '도서를 찾을 수 없습니다.' });
    return;
  }
  res.json(book);
};

const updateBook = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const { title, author, publishedDate } = req.body;
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    res.status(404).json({ error: '도서를 찾을 수 없습니다.' });
    return;
  }
  if (!title || !author || !publishedDate) {
    res.status(400).json({ error: '모든 필드를 입력해야 합니다.' });
    return;
  }
  books[bookIndex] = { id, title, author, publishedDate };
  res.json(books[bookIndex]);
};

const deleteBook = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    res.status(404).json({ error: '도서를 찾을 수 없습니다.' });
    return;
  }
  books.splice(bookIndex, 1);
  res.status(204).send();
};

export {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
};
