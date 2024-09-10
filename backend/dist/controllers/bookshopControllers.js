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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookControllers = void 0;
const bookshopModels_1 = require("../models/bookshopModels");
const errorHandler_1 = __importDefault(require("../middleware/errorHandler"));
const validation_handler_1 = require("../middleware/validation-handler");
class BookControllers {
    constructor() {
        this.getBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('la richiesta è: ', req);
            try {
                const books = yield this.bookshopModels.getBooks();
                console.log('I libri scraricti al primo caricamento sono: ', books);
                res.json(books);
            }
            catch (error) {
                console.error("Error caught in getBooks", error);
                //    res.status(500).json({error: "Errore nell'aggiunta del libro"});
                (0, errorHandler_1.default)(res, error);
            }
        });
        this.createNewBook = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validation_handler_1.validateBook)(req.body);
                const { title, author, published_year, genre, stock } = req.body;
                const newBook = yield this.bookshopModels.createNewBook({
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
                console.error("Error caught in getBooks", error);
                //    res.status(500).json({error: "Errore nell'aggiunta del libro"});
                (0, errorHandler_1.default)(res, error);
            }
        });
        this.updateBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validation_handler_1.validateBook)(req.body);
                const updateBook = yield this.bookshopModels.updateBook(req.body);
                if (updateBook) {
                    res.json(updateBook);
                }
                else {
                    res.status(404).json({ error: 'Libro non trovato' });
                }
            }
            catch (error) {
                console.error("Error caught in getBooks", error);
                //    res.status(500).json({error: "Errore nell'aggiunta del libro"});
                (0, errorHandler_1.default)(res, error);
            }
        });
        this.deleteBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteBook = yield this.bookshopModels.deleteBook(parseInt(req.params.id));
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
        this.bookshopModels = new bookshopModels_1.BookshopModels();
    }
}
exports.BookControllers = BookControllers;
//# sourceMappingURL=bookshopControllers.js.map