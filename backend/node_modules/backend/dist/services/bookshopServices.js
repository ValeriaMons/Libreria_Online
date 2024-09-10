"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookshopServices = void 0;
const db_1 = require("../config/db");
class BookshopServices {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM books';
            const { rows } = yield db_1.db.query(query);
            return rows;
        });
    }
    post(book) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!book.title || book.title.trim() === '') {
                throw new Error('Il titolo del libro è obbligatorio');
            }
            if (!book.author || book.author.trim() === '') {
                throw new Error('L\'autore del libro è obbligatorio');
            }
            if (book.published_year !== undefined) {
                const currentYear = new Date().getFullYear();
                if (!book.published_year || book.published_year > currentYear) {
                    throw new Error('L\'anno di pubblicazione non può essere nel futuro');
                }
            }
            try {
                const query = 'INSERT INTO books (title, author, published_year, genre, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *';
                const values = [book.title, book.author, book.published_year, book.genre, book.stock];
                const { rows } = yield db_1.db.query(query, values);
                return rows[0];
            }
            catch (error) {
                console.error('Errore nell\'esecuzione della query di inserimento:', error);
                throw error;
            }
        });
    }
    put(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE books SET title = $1, author = $2, published_year = $3, genre = $4, stock = $5 WHERE id = $6 RETURNING *';
            const values = [book.title, book.author, book.published_year, book.genre, book.stock, id];
            const { rows } = yield db_1.db.query(query, values);
            return rows[0] || null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM books WHERE id = $1';
            const { rowCount } = yield db_1.db.query(query, [id]);
            return (rowCount !== null && rowCount !== void 0 ? rowCount : 0) > 0;
        });
    }
}
exports.BookshopServices = BookshopServices;
