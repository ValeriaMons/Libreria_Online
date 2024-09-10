"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = require("express");
const bookshopControllers_1 = require("../controllers/bookshopControllers");
const router = (0, express_1.Router)();
const bookshopController = new (bookshopControllers_1.BookControllers);
router.get('/', bookshopController.createNewBook);
router.post('/', bookshopController.createNewBook);
router.put('/:id', bookshopController.updateBook);
router.delete('/:id', bookshopController.deleteBook);
exports.bookRoutes = router;
//# sourceMappingURL=routes.js.map