import express from 'express';
import ArticlesController from '../controllers/ArticlesController';
import ArticlesValidation from '../middlewares/ArticleValidation';
import checkAuthentication from '../middlewares/checkAuthentication';
import { checkArticle, checkTags } from '../middlewares/articleMiddleware';
import { publishAcess } from '../middlewares/authorization';

const { validateInput, checkArticleId } = ArticlesValidation;
const router = express.Router();


router.post('/', checkAuthentication, validateInput, checkTags, ArticlesController.create);
router.get('/', ArticlesController.list);
router.get('/:identifier', checkArticleId, checkArticle, ArticlesController.get);
router.put('/:identifier', checkAuthentication, checkArticleId, checkArticle, checkTags, ArticlesController.update);
router.delete('/:identifier', checkAuthentication, checkArticleId, checkArticle, ArticlesController.archive);

router.put('/:identifier/publish',
  checkAuthentication, publishAcess,
  checkArticleId, checkArticle, checkTags, ArticlesController.publish);
router.put('/:identifier/unpublish',
  checkAuthentication, publishAcess,
  checkArticleId, checkArticle, checkTags, ArticlesController.unpublish);

export default router;
