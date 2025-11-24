import axios from 'axios';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
}

const API_BASE_URL = '/api/books';

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
  const response = await axios.post(API_BASE_URL, book);
  return response.data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
