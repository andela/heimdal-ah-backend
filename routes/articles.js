import express from 'express';
import ArticlesController from '../controllers/ArticlesController';
import ArticlesValidation from '../middlewares/ArticleValidation';
import checkAuthentication from '../middlewares/checkAuthentication';

const router = express.Router();

router.post('/', checkAuthentication, ArticlesValidation.validateInput, ArticlesController.create);
router.get('/', checkAuthentication, ArticlesController.fetchArticles);
router.get('/:slug', checkAuthentication, ArticlesController.getArticle);
router.put('/:slug', checkAuthentication, ArticlesValidation.validateInput, ArticlesController.editArticle);
router.delete('/:slug', checkAuthentication, ArticlesController.deleteArticle);
export default router;
