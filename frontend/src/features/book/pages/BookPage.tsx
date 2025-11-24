'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { getAllBooks, createBook, deleteBook, Book } from '@features/book/services/bookService';
import BookForm from '@features/book/components/BookForm';
import BookList from '@features/book/components/BookList';

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [publishedDate, setPublishedDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (err) {
      setError('도서 목록을 불러올 수 없습니다.');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !publishedDate.trim()) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createBook({ title, author, publishedDate });
      setTitle('');
      setAuthor('');
      setPublishedDate('');
      fetchBooks(); // 목록 새로고침
    } catch (err) {
      setError('도서를 추가할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      fetchBooks(); // 목록 새로고침
    } catch (err) {
      setError('도서를 삭제할 수 없습니다.');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📚 도서 관리</h1>
          <p>도서를 추가하고 관리하세요</p>
        </header>

        <BookForm
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          publishedDate={publishedDate}
          setPublishedDate={setPublishedDate}
          loading={loading}
          onSubmit={handleSubmit}
        />

        {error && <div className="error">{error}</div>}

        <BookList books={books} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Books;
