import express from 'express';
import ArticlesController from '../controllers/ArticlesController';
import ArticlesValidation from '../middlewares/ArticleValidation';
import checkAuthentication from '../middlewares/checkAuthentication';
import { checkArticle, checkTags } from '../middlewares/articleMiddleware';

const router = express.Router();

router.post('/', checkAuthentication, ArticlesValidation.validateInput, checkTags, ArticlesController.create);
router.get('/', ArticlesController.list);
router.get('/:identifier', checkAuthentication, checkArticle, ArticlesController.get);
router.put('/:identifier', checkAuthentication, checkArticle, checkTags, ArticlesController.update);
router.delete('/:identifier', checkAuthentication, checkArticle, ArticlesController.archive);
export default router;
