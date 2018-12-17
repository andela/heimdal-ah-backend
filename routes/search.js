import express from 'express';
import { getAuthor } from '../middlewares/ProfilesMiddleware';
import getTagId from '../middlewares/ArticleByTag';
import SearchController from '../controllers/SearchController';

const router = express.Router();

router.get('/author', getAuthor, SearchController.byAuthor);
router.get('/title', SearchController.byTitle);
router.get('/tag', getTagId, SearchController.byTags);

export default router;
