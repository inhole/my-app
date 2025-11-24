import React from 'react';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDelete }) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>저자: {book.author}</p>
      <p>출판일: {book.publishedDate}</p>
      <button className="delete-btn" onClick={() => onDelete(book.id)} aria-label="삭제">
        ×
      </button>
    </div>
  );
};

export default BookCard;
