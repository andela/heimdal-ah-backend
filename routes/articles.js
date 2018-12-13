import express from 'express';
import ArticlesController from '../controllers/ArticlesController';
import ArticlesValidation from '../middlewares/ArticleValidation';
import checkAuthentication from '../middlewares/checkAuthentication';
// import { checkUser } from '../middlewares/checkArticle';

const router = express.Router();

router.post('/', checkAuthentication, ArticlesValidation.validateInput, ArticlesController.create);
router.get('/', checkAuthentication, ArticlesController.list);
router.get('/:identifier', checkAuthentication, ArticlesController.get);
router.put('/:identifier', checkAuthentication, ArticlesController.update);
router.delete('/:identifier', checkAuthentication, ArticlesController.archive);
export default router;
