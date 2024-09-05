import axios from 'axios';
var API_URL = 'http://localhost:3000/books';
export var get = function () { return axios.get("".concat(API_URL, "/books")); };
export var post = function () { return axios.post("".concat(API_URL, "/books")); };
export var put = function (id) { return axios.put("".concat(API_URL, "/books/:id").concat(id)); };
export var deletebook = function (id) { return axios.delete("".concat(API_URL, "/books/:id").concat(id)); };
