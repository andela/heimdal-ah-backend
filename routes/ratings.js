import express from 'express';
import Ratings from '../controllers/RatingsController';
import checkAuthentication from '../middlewares/checkAuthentication';
import checkArticle from '../middlewares/articleMiddleware';
import { checkArticlesId, validRatingsInput } from '../middlewares/RatingsMiddleware';

const router = express.Router();

router.post('/articles/:identifier', checkAuthentication, checkArticle, checkArticlesId, validRatingsInput, Ratings.create);
router.get('/articles/:identifier', checkArticle, checkArticlesId, Ratings.retrieve);

export default router;
