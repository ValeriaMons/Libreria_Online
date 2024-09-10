

import { Router } from 'express';
import { BookControllers } from '../controllers/bookshopControllers';

const router = Router();
const bookshopController = new (BookControllers);

router.get('/', bookshopController.getBooks);
router.post('/', bookshopController.createNewBook);
router.put('/:id', bookshopController.updateBook);
router.delete('/:id', bookshopController.deleteBook);


export const bookRoutes = router;