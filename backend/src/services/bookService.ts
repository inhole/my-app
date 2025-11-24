import { Book } from '../types/book';
import * as bookModel from '../models/bookModel';

export const getAllBooks = (): Book[] => {
  return bookModel.getAllBooks();
};

export const createBook = (bookData: { title: string; author: string; publishedDate: string }): Book => {
  if (!bookData.title || !bookData.author || !bookData.publishedDate) {
    throw new Error('모든 필드를 입력해야 합니다.');
  }
  return bookModel.createBook(bookData);
};

export const getBookById = (id: number): Book => {
  const book = bookModel.getBookById(id);
  if (!book) {
    throw new Error('도서를 찾을 수 없습니다.');
  }
  return book;
};

export const updateBook = (id: number, bookData: { title: string; author: string; publishedDate: string }): Book => {
  if (!bookData.title || !bookData.author || !bookData.publishedDate) {
    throw new Error('모든 필드를 입력해야 합니다.');
  }
  const updatedBook = bookModel.updateBook(id, bookData);
  if (!updatedBook) {
    throw new Error('도서를 찾을 수 없습니다.');
  }
  return updatedBook;
};

export const deleteBook = (id: number): void => {
  const success = bookModel.deleteBook(id);
  if (!success) {
    throw new Error('도서를 찾을 수 없습니다.');
  }
};
