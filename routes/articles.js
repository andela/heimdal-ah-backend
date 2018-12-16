import express from 'express';
import ArticlesController from '../controllers/ArticlesController';
import ArticlesValidation from '../middlewares/ArticleValidation';
import checkAuthentication from '../middlewares/checkAuthentication';
import { findArticleById, checkArticle } from '../middlewares/articleMiddleware';

const router = express.Router();

router.post('/', checkAuthentication, ArticlesValidation.validateInput, ArticlesController.create);
router.get('/', checkAuthentication, ArticlesController.list);
router.get('/:identifier', checkAuthentication, checkArticle, ArticlesController.get);
router.put('/:id', checkAuthentication, findArticleById, ArticlesController.update);
router.delete('/:id', checkAuthentication, findArticleById, ArticlesController.archive);
export default router;
