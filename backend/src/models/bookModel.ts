import { Book } from '../types/book';

// 도서 데이터 저장 (메모리 기반)
let books: Book[] = [];
let nextId: number = 1;

export const getAllBooks = (): Book[] => {
  return books;
};

export const createBook = (bookData: Omit<Book, 'id'>): Book => {
  const newBook: Book = {
    id: nextId++,
    ...bookData,
  };
  books.push(newBook);
  return newBook;
};

export const getBookById = (id: number): Book | undefined => {
  return books.find(b => b.id === id);
};

export const updateBook = (id: number, bookData: Omit<Book, 'id'>): Book | null => {
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return null;
  }
  books[bookIndex] = { id, ...bookData };
  return books[bookIndex];
};

export const deleteBook = (id: number): boolean => {
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return false;
  }
  books.splice(bookIndex, 1);
  return true;
};
