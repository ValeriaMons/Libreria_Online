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
import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookList.css';
var API_BASE_URL = 'http://localhost:5000/api';
var BookList = function () {
    var _a, _b, _c, _d, _e, _f;
    var navigate = useNavigate();
    var _g = useState([]), books = _g[0], setBooks = _g[1];
    var _h = useState(''), searchTerm = _h[0], setSearchTerm = _h[1];
    var _j = useState(false), isSearching = _j[0], setIsSearching = _j[1];
    var _k = useState(false), isInsertFormVisible = _k[0], setIsInsertFormVisible = _k[1];
    var _l = useState(false), isEditFormVisible = _l[0], setIsEditFormVisible = _l[1];
    var _m = useState(false), isLoading = _m[0], setIsLoading = _m[1];
    var _o = useState(null), error = _o[0], setError = _o[1];
    var _p = useState(false), isUpdating = _p[0], setIsUpdating = _p[1];
    var _q = useState({
        title: '',
        author: '',
        published_year: null,
        genre: null,
        stock: null
    }), newBook = _q[0], setNewBook = _q[1];
    var _r = useState(null), editingBook = _r[0], setEditingBook = _r[1];
    var handleApiError = useCallback(function (error, action) {
        var _a, _b;
        console.error("Errore durante ".concat(action, ":"), error);
        if (axios.isAxiosError(error)) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                console.log('Sessione scaduta. Reindirizzamento al login.');
                localStorage.removeItem('token');
                navigate('/login');
            }
            else {
                setError("Errore durante ".concat(action, ": ").concat(((_b = error.response) === null || _b === void 0 ? void 0 : _b.data.message) || error.message));
            }
        }
        else {
            setError("Errore imprevisto durante ".concat(action, "."));
        }
    }, [navigate]);
    var fetchBooks = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    token = localStorage.getItem('token');
                    return [4 /*yield*/, axios.get("".concat(API_BASE_URL, "/books"), {
                            headers: { Authorization: "Bearer ".concat(token) }
                        })];
                case 2:
                    response = _a.sent();
                    setBooks(response.data);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    handleApiError(error_1, 'il recupero dei libri');
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [handleApiError]);
    useEffect(function () {
        var token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        else {
            fetchBooks();
        }
    }, [navigate, fetchBooks]);
    var searchResults = useMemo(function () {
        if (!isSearching)
            return books;
        return books.filter(function (book) {
            return book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [books, searchTerm, isSearching]);
    var handleSearch = function (event) {
        event.preventDefault();
        setIsSearching(true);
    };
    var handleInsert = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var token, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    token = localStorage.getItem('token');
                    return [4 /*yield*/, axios.post("".concat(API_BASE_URL, "/books"), newBook, {
                            headers: { Authorization: "Bearer ".concat(token) }
                        })];
                case 2:
                    _a.sent();
                    setNewBook({
                        title: '',
                        author: '',
                        published_year: null,
                        genre: null,
                        stock: null
                    });
                    setIsInsertFormVisible(false);
                    fetchBooks();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    handleApiError(error_2, "l'inserimento del libro");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleEdit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var token, id, title, author, published_year, genre, stock, bookData, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!editingBook)
                        return [2 /*return*/];
                    setError(null);
                    setIsUpdating(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    token = localStorage.getItem('token');
                    if (!token)
                        throw new Error('Token di autenticazione non trovato');
                    id = editingBook.id, title = editingBook.title, author = editingBook.author, published_year = editingBook.published_year, genre = editingBook.genre, stock = editingBook.stock;
                    bookData = { title: title, author: author, published_year: published_year, genre: genre, stock: stock };
                    return [4 /*yield*/, axios.put("".concat(API_BASE_URL, "/books/").concat(id), bookData, {
                            headers: { Authorization: "Bearer ".concat(token) }
                        })];
                case 2:
                    _a.sent();
                    setIsEditFormVisible(false);
                    fetchBooks();
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    handleApiError(error_3, 'la modifica del libro');
                    return [3 /*break*/, 5];
                case 4:
                    setIsUpdating(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var token, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Sei sicuro di voler eliminare questo libro?')) return [3 /*break*/, 4];
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    token = localStorage.getItem('token');
                    return [4 /*yield*/, axios.delete("".concat(API_BASE_URL, "/books/").concat(id), {
                            headers: { Authorization: "Bearer ".concat(token) }
                        })];
                case 2:
                    _a.sent();
                    fetchBooks();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    handleApiError(error_4, "l'eliminazione del libro");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleInputChange = function (event) {
        setSearchTerm(event.target.value);
        setIsSearching(event.target.value !== '');
    };
    var handleLogout = function () {
        localStorage.removeItem('token');
        navigate('/login');
    };
    var renderBooks = function () {
        if (searchResults.length === 0) {
            return _jsx("p", { children: "Nessun libro trovato." });
        }
        return (_jsx("ul", { className: "books-grid", children: searchResults.map(function (book) { return (_jsxs("li", { className: "book-item", children: [_jsx("h3", { children: book.title }), _jsxs("p", { children: ["Autore: ", book.author] }), _jsxs("p", { children: ["Anno di pubblicazione: ", book.published_year] }), _jsxs("p", { children: ["Genere: ", book.genre] }), _jsxs("p", { children: ["Copie disponibili: ", book.stock] }), _jsx("button", { className: 'editButton', onClick: function () {
                            setEditingBook(__assign({}, book));
                            setIsEditFormVisible(true);
                        }, children: "Modifica" }), _jsx("button", { className: 'deleteButton', onClick: function () { return handleDelete(book.id); }, children: "Elimina" })] }, book.id)); }) }));
    };
    return (_jsxs("div", { className: "book-list", children: [_jsx("h1", { className: 'title-document', children: "Libreria Online" }), _jsx("button", { onClick: handleLogout, className: "logout-button", children: "Logout" }), _jsxs("form", { onSubmit: handleSearch, className: "search-form", children: [_jsx("label", { htmlFor: "search-input" }), _jsx("input", { id: "search-input", type: "text", value: searchTerm, onChange: handleInputChange, placeholder: "Cerca per titolo o autore", className: "search-input" }), _jsx("button", { type: "submit", className: "search-button", children: "Cerca" })] }), _jsx("button", { onClick: function () { return setIsInsertFormVisible(!isInsertFormVisible); }, className: "mostra-button", children: isInsertFormVisible ? 'Nascondi' : 'Inserisci Nuovo Libro' }), isInsertFormVisible && (_jsxs("form", { onSubmit: handleInsert, className: "add-form", children: [_jsx("label", { htmlFor: "insert-title" }), _jsx("input", { id: "insert-title", type: "text", value: newBook.title, onChange: function (e) { return setNewBook(__assign(__assign({}, newBook), { title: e.target.value })); }, placeholder: "Titolo", className: "insertTitle", required: true }), _jsx("label", { htmlFor: "insert-author" }), _jsx("input", { id: "insert-author", type: "text", value: newBook.author, onChange: function (e) { return setNewBook(__assign(__assign({}, newBook), { author: e.target.value })); }, placeholder: "Autore", className: "insertAuthor", required: true }), _jsx("label", { htmlFor: "insert-year" }), _jsx("input", { id: "insert-year", type: 'number', value: (_a = newBook.published_year) !== null && _a !== void 0 ? _a : '', onChange: function (e) { return setNewBook(__assign(__assign({}, newBook), { published_year: e.target.value ? Number(e.target.value) : null })); }, placeholder: "Anno di pubblicazione", className: "insertPublished_Year", min: "0", max: new Date().getFullYear() }), _jsx("label", { htmlFor: "insert-genre" }), _jsx("input", { id: "insert-genre", type: "text", value: (_b = newBook.genre) !== null && _b !== void 0 ? _b : '', onChange: function (e) { return setNewBook(__assign(__assign({}, newBook), { genre: e.target.value || null })); }, placeholder: "Genere", className: "insertGenre" }), _jsx("label", { htmlFor: "insert-stock" }), _jsx("input", { id: "insert-stock", type: 'number', value: (_c = newBook.stock) !== null && _c !== void 0 ? _c : '', onChange: function (e) { return setNewBook(__assign(__assign({}, newBook), { stock: e.target.value ? Number(e.target.value) : null })); }, placeholder: "Copie disponibili", className: "insertStock", min: "0" }), _jsx("button", { type: "submit", className: "insert-button", children: "Inserisci" }), _jsx("button", { type: "button", onClick: function () { return setIsInsertFormVisible(false); }, className: "cancel-button", children: "Annulla" })] })), isEditFormVisible && editingBook && (_jsx("div", { className: "edit-form-overlay", children: _jsxs("div", { className: "edit-form-container", children: [_jsx("h2", { className: 'modificaLibro', children: "Modifica Libro" }), _jsxs("form", { onSubmit: handleEdit, className: "edit-form", children: [_jsx("label", { htmlFor: "edit-title" }), _jsx("input", { id: "edit-title", type: "text", value: editingBook.title, onChange: function (e) { return setEditingBook(__assign(__assign({}, editingBook), { title: e.target.value })); }, placeholder: "Titolo", className: "editTitle", required: true }), _jsx("label", { htmlFor: "edit-author" }), _jsx("input", { id: "edit-author", type: "text", value: editingBook.author, onChange: function (e) { return setEditingBook(__assign(__assign({}, editingBook), { author: e.target.value })); }, placeholder: "Autore", className: "editAuthor", required: true }), _jsx("label", { htmlFor: "edit-year" }), _jsx("input", { id: "edit-year", type: 'number', value: (_d = editingBook.published_year) !== null && _d !== void 0 ? _d : '', onChange: function (e) { return setEditingBook(__assign(__assign({}, editingBook), { published_year: e.target.value ? Number(e.target.value) : null })); }, placeholder: "Anno di pubblicazione", className: "editPublished_Year", min: "0", max: new Date().getFullYear() }), _jsx("label", { htmlFor: "edit-genre" }), _jsx("input", { id: "edit-genre", type: "text", value: (_e = editingBook.genre) !== null && _e !== void 0 ? _e : '', onChange: function (e) { return setEditingBook(__assign(__assign({}, editingBook), { genre: e.target.value || null })); }, placeholder: "Genere", className: "editGenre" }), _jsx("label", { htmlFor: "edit-stock" }), _jsx("input", { id: "edit-stock", type: 'number', value: (_f = editingBook.stock) !== null && _f !== void 0 ? _f : '', onChange: function (e) { return setEditingBook(__assign(__assign({}, editingBook), { stock: e.target.value ? Number(e.target.value) : null })); }, placeholder: "Copie disponibili", className: "editStock", min: "0" }), _jsx("button", { type: "submit", className: "edit-button", children: "Salva Modifiche" }), _jsx("button", { type: "button", onClick: function () { return setIsEditFormVisible(false); }, className: "cancel-button", children: "Annulla" })] })] }) })), error && _jsx("p", { className: "error-message", children: error }), isLoading ? _jsx("p", { children: "Caricamento in corso..." }) : renderBooks()] }));
};
export default BookList;
