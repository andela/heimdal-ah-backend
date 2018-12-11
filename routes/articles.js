import express from 'express';
import ArticlesController from '../controllers/ArticlesController';
import ArticlesValidation from '../middlewares/ArticleValidation';

const router = express.Router();

router.post('/:userId', ArticlesValidation.validateAllParams, ArticlesController.create);
router.get('/', ArticlesController.fetchArticles);
router.get('/:slug', ArticlesController.getArticle);
router.put('/:slug', ArticlesController.editArticle);
export default router;
