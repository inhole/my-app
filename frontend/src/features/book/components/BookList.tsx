import React from 'react';
import { Book } from '../types/book';
import BookCard from './BookCard';

interface BookListProps {
  books: Book[];
  onDelete: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDelete }) => {
  return (
    <div className="books-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BookList;
