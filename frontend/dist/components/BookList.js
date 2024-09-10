var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.css';
var BookList = function () {
    var _a, _b, _c, _d, _e, _f;
    var _g = useState([]), books = _g[0], setBooks = _g[1];
    var _h = useState(''), searchTerm = _h[0], setSearchTerm = _h[1];
    var _j = useState([]), searchResults = _j[0], setSearchResults = _j[1];
    var _k = useState(false), isSearching = _k[0], setIsSearching = _k[1];
    var _l = useState(false), isInsertFormVisible = _l[0], setIsInsertFormVisible = _l[1];
    var _m = useState(false), isEditFormVisible = _m[0], setIsEditFormVisible = _m[1];
    var _o = useState({
        title: '',
        author: '',
        published_year: null,
        genre: '',
        stock: null
    }), newBook = _o[0], setNewBook = _o[1];
    var _p = useState(null), editingBook = _p[0], setEditingBook = _p[1];
    useEffect(function () {
        fetchBooks();
    }, []);
    var fetchBooks = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
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
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post('http://localhost:5000/books', newBook)];
                case 2:
                    _a.sent();
                    setNewBook({
                        title: '',
                        author: '',
                        published_year: null,
                        genre: '',
                        stock: null
                    });
                    setIsInsertFormVisible(false);
                    fetchBooks();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Errore nell\'inserimento del libro:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleEdit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!editingBook)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.put("http://localhost:5000/books/".concat(editingBook.id), editingBook)];
                case 2:
                    _a.sent();
                    setIsEditFormVisible(false);
                    fetchBooks();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Errore nella modifica del libro:', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var toggleInsertForm = function () {
        setIsInsertFormVisible(!isInsertFormVisible);
    };
    var openEditForm = function (book) {
        setEditingBook(__assign({}, book));
        setIsEditFormVisible(true);
    };
    var handleInputChange = function (event) {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setIsSearching(false);
            setSearchResults([]);
        }
    };
    var handleDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios.delete("http://localhost:5000/books/".concat(id))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fetchBooks()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error('Errore durante l\'eliminazione del libro:', error_4);
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
        return (_jsx("ul", { className: "books-grid", children: booksToRender.map(function (book) { return (_jsxs("li", { className: "book-item", children: [_jsx("h3", { children: book.title }), _jsxs("p", { children: ["Autore: ", book.author] }), _jsxs("p", { children: ["Anno di pubblicazione: ", book.published_year] }), _jsxs("p", { children: ["Genere: ", book.genre] }), _jsxs("p", { children: ["Copie disponibili: ", book.stock] }), _jsx("button", { className: 'editButton', onClick: function () { return openEditForm(book); }, children: "Modifica" }), _jsx("button", { className: 'deleteButton', onClick: function () { return handleDelete(book.id); }, children: "Elimina" })] }, book.id)); }) }));
    };
    return (_jsxs("div", { className: "book-list", children: [_jsx("h1", { className: 'title-document', children: "Libreria Online" }), _jsxs("form", { onSubmit: handleSearch, className: "search-form", children: [_jsx("input", { type: "text", value: searchTerm, onChange: handleInputChange, placeholder: "Cerca per titolo o autore", className: "search-input" }), _jsx("button", { type: "submit", className: "search-button", children: "Cerca" })] }), _jsx("button", { onClick: toggleInsertForm, className: "mostra-button", children: isInsertFormVisible ? 'Nascondi' : 'Inserisci Nuovo Libro' }), isInsertFormVisible && (_jsxs("form", { onSubmit: handleInsert, className: "add-form", children: [_jsx("input", { type: "text", value: newBook.title, onChange: function (e) { return setNewBook(__assign(__assign({}, newBook), { title: e.target.value })); }, placeholder: "Title", className: "insertTitle", required: true }), _jsx("input", { type: "text", value: newBook.author, onChange: function (e) { return setNewBook(__assign(__assign({}, newBook), { author: e.target.value })); }, placeholder: "Author", className: "insertAuthor", required: true }), _jsx("input", { type: 'number', value: (_a = newBook.published_year) !== null && _a !== void 0 ? _a : '', onChange: function (e) { return setNewBook(__assign(__assign({}, newBook), { published_year: Number(e.target.value) })); }, placeholder: "Published Year", className: "insertPublished_Year", min: "0", max: "2024", required: true }), _jsx("input", { type: "text", value: (_b = newBook.genre) !== null && _b !== void 0 ? _b : '', onChange: function (e) { return setNewBook(__assign(__assign({}, newBook), { genre: e.target.value })); }, placeholder: "Genre", className: "insertGenre" }), _jsx("input", { type: 'number', value: (_c = newBook.stock) !== null && _c !== void 0 ? _c : '', onChange: function (e) { return setNewBook(__assign(__assign({}, newBook), { stock: Number(e.target.value) })); }, placeholder: "Stock", className: "insertStock" }), _jsx("button", { type: "submit", className: "insert-button", children: "Inserisci" })] })), isEditFormVisible && editingBook && (_jsx("div", { className: "edit-form-overlay", children: _jsxs("div", { className: "edit-form-container", children: [_jsx("h2", { className: 'modificaLibro', children: "Modifica Libro" }), _jsxs("form", { onSubmit: handleEdit, className: "edit-form", children: [_jsx("input", { type: "text", value: editingBook.title, onChange: function (e) { return setEditingBook(__assign(__assign({}, editingBook), { title: e.target.value })); }, placeholder: "Title", className: "editTitle", required: true }), _jsx("input", { type: "text", value: editingBook.author, onChange: function (e) { return setEditingBook(__assign(__assign({}, editingBook), { author: e.target.value })); }, placeholder: "Author", className: "editAuthor", required: true }), _jsx("input", { type: 'number', value: (_d = editingBook.published_year) !== null && _d !== void 0 ? _d : '', onChange: function (e) { return setEditingBook(__assign(__assign({}, editingBook), { published_year: Number(e.target.value) })); }, placeholder: "Published Year", className: "editPublished_Year", min: "0", max: "2024", required: true }), _jsx("input", { type: "text", value: (_e = editingBook.genre) !== null && _e !== void 0 ? _e : '', onChange: function (e) { return setEditingBook(__assign(__assign({}, editingBook), { genre: e.target.value })); }, placeholder: "Genre", className: "editGenre" }), _jsx("input", { type: 'number', value: (_f = editingBook.stock) !== null && _f !== void 0 ? _f : '', onChange: function (e) { return setEditingBook(__assign(__assign({}, editingBook), { stock: Number(e.target.value) })); }, placeholder: "Stock", className: "editStock" }), _jsx("button", { type: "submit", className: "edit-button", children: "Salva Modifiche" }), _jsx("button", { type: "button", onClick: function () { return setIsEditFormVisible(false); }, className: "cancel-button", children: "Annulla" })] })] }) })), renderBooks()] }));
};
export default BookList;
