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
const validation_handler_1 = require("../middleware/validation-handler");
const errorHandler_1 = __importDefault(require("../middleware/errorHandler"));
class BookControllers {
    constructor() {
        this.getBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.bookshopModels.getBooks();
                res.json(books);
            }
            catch (error) {
                console.error("Error in getBooks:", error);
                (0, errorHandler_1.default)(res, error);
            }
        });
        this.createNewBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validation_handler_1.validateBook)(req.body);
                const newBook = yield this.bookshopModels.createNewBook(req.body);
                res.status(201).json(newBook);
            }
            catch (error) {
                console.error("Error in createNewBook:", error);
                (0, errorHandler_1.default)(res, error);
            }
        });
        this.updateBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = parseInt(req.params.id, 10); // Estrai l'ID del libro dall'URL
                const bookData = req.body;
                (0, validation_handler_1.validateBook)(bookData);
                // Passa l'ID del libro separatamente dai dati del libro
                const updatedBook = yield this.bookshopModels.updateBook(bookId, bookData);
                if (updatedBook) {
                    res.json(updatedBook);
                }
                else {
                    res.status(404).json({ error: 'Libro non trovato' });
                }
            }
            catch (error) {
                console.error("Error in updateBook:", error);
                (0, errorHandler_1.default)(res, error);
            }
        });
        this.deleteBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield this.bookshopModels.deleteBook(parseInt(req.params.id));
                if (deleted) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ error: 'Libro non trovato' });
                }
            }
            catch (error) {
                console.error("Error in deleteBook:", error);
                (0, errorHandler_1.default)(res, error);
            }
        });
        this.bookshopModels = new bookshopModels_1.BookshopModels();
    }
}
exports.BookControllers = BookControllers;
//# sourceMappingURL=bookshopControllers.js.map