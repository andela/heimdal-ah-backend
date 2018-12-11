import express from 'express';

import ArticlesController from '../controllers/ArticlesController';

const router = express.Router();

router.post('/', ArticlesController.createArticle);

export default router;
