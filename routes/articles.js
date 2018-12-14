import express from 'express';
import ArticlesController from '../controllers/ArticlesController';
import ArticlesValidation from '../middlewares/ArticleValidation';
import checkAuthentication from '../middlewares/checkAuthentication';
import checkArticle from '../middlewares/articleMiddleware';

const router = express.Router();

router.post('/', checkAuthentication, ArticlesValidation.validateInput, ArticlesController.create);
router.get('/', checkAuthentication, ArticlesController.list);
router.get('/:identifier', checkAuthentication, checkArticle, ArticlesController.get);
router.put('/:identifier', checkAuthentication, checkArticle, ArticlesController.update);
router.delete('/:identifier', checkAuthentication, checkArticle, ArticlesController.archive);

export default router;
