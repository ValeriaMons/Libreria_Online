"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const express_1 = require("express");
const bookshopControllers_1 = require("../controllers/bookshopControllers");
const authController_1 = require("../controllers/authController");
const authenticateToken_1 = require("../middleware/authenticateToken");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
const bookshopController = new bookshopControllers_1.BookControllers();
// Rotte di autenticazione
router.post('/auth/login', authController_1.login);
router.post('/auth/register', authController_1.register);
// Rotte del profilo utente (protette)
router.get('/user/profile', authenticateToken_1.authenticateToken, userController_1.getUserProfile);
router.post('/user/profile', authenticateToken_1.authenticateToken, userController_1.updateUserProfile);
// Rotte dei libri (protette)
router.get('/books', authenticateToken_1.authenticateToken, bookshopController.getBooks);
router.post('/books', authenticateToken_1.authenticateToken, bookshopController.createNewBook);
router.put('/books/:id', authenticateToken_1.authenticateToken, bookshopController.updateBook);
router.delete('/books/:id', authenticateToken_1.authenticateToken, bookshopController.deleteBook);
exports.appRoutes = router;
//# sourceMappingURL=routes.js.map