"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.createBook = exports.getAllBooks = void 0;
// 도서 데이터 저장 (메모리 기반)
let books = [];
let nextId = 1;
const getAllBooks = () => {
    return books;
};
exports.getAllBooks = getAllBooks;
const createBook = (bookData) => {
    const newBook = {
        id: nextId++,
        ...bookData,
    };
    books.push(newBook);
    return newBook;
};
exports.createBook = createBook;
const getBookById = (id) => {
    return books.find(b => b.id === id);
};
exports.getBookById = getBookById;
const updateBook = (id, bookData) => {
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
        return null;
    }
    books[bookIndex] = { id, ...bookData };
    return books[bookIndex];
};
exports.updateBook = updateBook;
const deleteBook = (id) => {
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
        return false;
    }
    books.splice(bookIndex, 1);
    return true;
};
exports.deleteBook = deleteBook;
//# sourceMappingURL=bookModel.js.map