"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.createBook = exports.getAllBooks = void 0;
const bookModel = __importStar(require("../models/bookModel"));
const getAllBooks = () => {
    return bookModel.getAllBooks();
};
exports.getAllBooks = getAllBooks;
const createBook = (bookData) => {
    if (!bookData.title || !bookData.author || !bookData.publishedDate) {
        throw new Error('모든 필드를 입력해야 합니다.');
    }
    return bookModel.createBook(bookData);
};
exports.createBook = createBook;
const getBookById = (id) => {
    const book = bookModel.getBookById(id);
    if (!book) {
        throw new Error('도서를 찾을 수 없습니다.');
    }
    return book;
};
exports.getBookById = getBookById;
const updateBook = (id, bookData) => {
    if (!bookData.title || !bookData.author || !bookData.publishedDate) {
        throw new Error('모든 필드를 입력해야 합니다.');
    }
    const updatedBook = bookModel.updateBook(id, bookData);
    if (!updatedBook) {
        throw new Error('도서를 찾을 수 없습니다.');
    }
    return updatedBook;
};
exports.updateBook = updateBook;
const deleteBook = (id) => {
    const success = bookModel.deleteBook(id);
    if (!success) {
        throw new Error('도서를 찾을 수 없습니다.');
    }
};
exports.deleteBook = deleteBook;
//# sourceMappingURL=bookService.js.map