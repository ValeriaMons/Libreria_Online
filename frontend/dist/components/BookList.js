import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.css';


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var BookList = function () {
    var _a = useState([]), books = _a[0], setBooks = _a[1];
    var _b = useState(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = useState([]), searchResults = _c[0], setSearchResults = _c[1];
    var _d = useState(false), isSearching = _d[0], setIsSearching = _d[1];
    var _e = useState(''), title = _e[0], setTitle = _e[1];
    var _f = useState(''), author = _f[0], setAuthor = _f[1];
    var _g = useState(null), published_year = _g[0], setPublished_year = _g[1];
    var _h = useState(null), genre = _h[0], setGenre = _h[1];
    var _j = useState(null), stock = _j[0], setStock = _j[1];
    useEffect(function () {
        fetchBooks();
    }, []);
    var fetchBooks = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            // eslint-disable-next-line default-case
            switch (_a.label) {
                case 0:
                    // eslint-disable-next-line no-sparse-arrays
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get('http://localhost:5000/books')];
                case 1:
                    response = _a.sent();
                    setBooks(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Errore nel recupero dei libri:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleSearch = function (event) {
        event.preventDefault();
        setIsSearching(true);
        var results = books.filter(function (book) {
            return book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSearchResults(results);
    };
    var handleInsert = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            // eslint-disable-next-line default-case
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                // eslint-disable-next-line no-fallthrough
                case 1:
                    // eslint-disable-next-line no-sparse-arrays
                    _a.trys.push([1, 3, , 4]);
                    console.log('Sending POST request to http://localhost:5000/books');
                    return [4 /*yield*/, axios.post('http://localhost:5000/books', {
                            title: title,
                            author: author,
                            published_year: published_year,
                            genre: genre,
                            stock: stock
                        })];
                case 2:
                    response = _a.sent();
                    console.log('Risposta dal server:', response.data);
                    setTitle('');
                    setAuthor('');
                    setPublished_year(Number || null);
                    setGenre('' || null);
                    setStock(Number || null);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Errore nella creazione del libro:', error_2);
                    return [3 /*break*/, 4];
                case 4:
                    window.location.reload();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleInputChange = function (event) {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setIsSearching(false);
            setSearchResults([]);
        }
    };
    var handleDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            // eslint-disable-next-line default-case
            switch (_a.label) {
                case 0:
                    // eslint-disable-next-line no-sparse-arrays
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios.delete("http://localhost:5000/books/".concat(id))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fetchBooks()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Errore durante l\'eliminazione del libro:', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var renderBooks = function () {
        var booksToRender = isSearching ? searchResults : books;
        if (booksToRender.length === 0) {
            return _jsx("p", { children: "Nessun libro trovato." });
        }
        return (_jsx("ul", { className: "books-grid", children: booksToRender.map(function (book) { return (_jsxs("li", { className: "book-item", children: [_jsx("h3", { children: book.title }), _jsxs("p", { children: ["Autore: ", book.author] }), _jsxs("p", { children: ["Anno di pubblicazione: ", book.published_year] }), _jsxs("p", { children: ["Genere: ", book.genre] }), _jsxs("p", { children: ["Copie disponibili: ", book.stock] }), _jsx("button", { className: 'deleteButton', onClick: function () { return handleDelete(book.id); }, children: "Elimina" })] }, book.id)); }) }));
    };
    return (_jsxs("div", { className: "book-list", children: [_jsx("h1", { className: 'title-document', children: "Libreria Online" }), _jsxs("form", { onSubmit: handleSearch, className: "search-form", children: [_jsx("input", { type: "text", value: searchTerm, onChange: handleInputChange, placeholder: "Cerca per titolo o autore", className: "search-input" }), _jsx("button", { type: "submit", className: "search-button", children: "Cerca" })] }), _jsxs("form", { onSubmit: handleInsert, className: "add-form", children: [_jsx("input", { type: "text", value: title, onChange: function (e) { return setTitle(e.target.value); }, placeholder: "Title", className: "insertTite" }), _jsx("input", { type: "text", value: author, onChange: function (e) { return setAuthor(e.target.value); }, placeholder: "Author", className: "insertAuthor" }), _jsx("input", { type: 'number', value: published_year !== null && published_year !== void 0 ? published_year : '', onChange: function (e) { return setPublished_year(Number(e.target.value)); }, placeholder: "Published_Year", className: "insertPublished_Year" }), _jsx("input", { type: "text", value: genre !== null && genre !== void 0 ? genre : '', onChange: function (e) { return setGenre(e.target.value); }, placeholder: "Genre", className: "insertGenre" }), _jsx("input", { type: 'number', value: stock !== null && stock !== void 0 ? stock : '', onChange: function (e) { return setStock(Number(e.target.value)); }, placeholder: "Stock", className: "insertStock" }), _jsx("button", { type: "submit", className: "insert-button", children: "Inserisci" })] }), renderBooks()] }));
};
export default BookList;
