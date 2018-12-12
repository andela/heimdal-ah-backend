import express from 'express';

import ArticlesController from '../controllers/ArticlesController';

const router = express.Router();

router.post('/', ArticlesController.create);

export default router;
