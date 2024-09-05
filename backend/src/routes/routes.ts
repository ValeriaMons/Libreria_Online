//const  expressRoutes = require('express');
//const router = expressRoutes.Router();
//const bookshopController = require('../controllers/bookshopControllers');

import { Router } from 'express';
import { BookControllers } from '../controllers/bookshopControllers';

const router = Router();
const bookshopController = new (BookControllers);

router.get('/', bookshopController.get);
router.post('/', bookshopController.post);
router.put('/:id', bookshopController.put);
router.delete('/:id', bookshopController.delete);


export const bookRoutes = router;