import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';
var App = function () {
    var isAuthenticated = function () { return !!localStorage.getItem('token'); };
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/books", element: isAuthenticated() ? _jsx(BookList, {}) : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "/", element: isAuthenticated() ? _jsx(Navigate, { to: "/books" }) : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }));
};
export default App;
