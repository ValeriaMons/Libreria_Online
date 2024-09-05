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
exports.BookControllers = void 0;
const bookshopServices_1 = require("../services/bookshopServices"); //{BookShopServices}
class BookControllers {
    constructor() {
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.bookshopServices.get();
                res.json(books);
            }
            catch (error) {
                res.status(500).json({ error: 'Errore nel recupero dei libri' });
            }
        });
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Received request body:', req.body); // Log del body ricevuto
                // Validazione base
                if (!req.body || typeof req.body !== 'object') {
                    return res.status(400).json({ message: 'Invalid request body' });
                }
                const { title, author, published_year, genre, stock } = req.body;
                if (!title || !author) {
                    return res.status(400).json({ message: 'Title and author are required' });
                }
                const newBook = yield this.bookshopServices.post({
                    title,
                    author,
                    published_year: published_year ? parseInt(published_year) : null,
                    genre: genre || null,
                    stock: stock ? parseInt(stock) : 0,
                    id: 0
                });
                res.status(201).json(newBook);
            }
            catch (error) {
                console.error('Errore nell\'aggiunta del libro:', error);
                res.status(500).json({
                    message: 'Errore nell\'aggiunta del libro',
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        });
        this.put = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateBook = yield this.bookshopServices.put(parseInt(req.params.id), req.body);
                if (updateBook) {
                    res.json(updateBook);
                }
                else {
                    res.status(404).json({ error: 'Libro non trovato' });
                }
            }
            catch (error) {
                res.status(505).json({ error: 'Errore nell\'aggiornamento del libro' });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteBook = yield this.bookshopServices.delete(parseInt(req.params.id));
                if (deleteBook) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ error: 'Libro non trovato' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Errore nella rimozione del libro' });
            }
        });
        this.bookshopServices = new bookshopServices_1.BookshopServices();
    }
}
exports.BookControllers = BookControllers;
