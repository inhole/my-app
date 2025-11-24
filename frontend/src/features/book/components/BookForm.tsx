import React, { FormEvent } from 'react';

interface BookFormProps {
  title: string;
  setTitle: (value: string) => void;
  author: string;
  setAuthor: (value: string) => void;
  publishedDate: string;
  setPublishedDate: (value: string) => void;
  loading: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const BookForm: React.FC<BookFormProps> = ({
  title,
  setTitle,
  author,
  setAuthor,
  publishedDate,
  setPublishedDate,
  loading,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="book-form">
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="저자"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input
        type="date"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? '추가 중...' : '도서 추가'}
      </button>
    </form>
  );
};

export default BookForm;
