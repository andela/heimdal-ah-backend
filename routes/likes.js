import express from 'express';
import LikesController from '../controllers/LikesController';
import checkAuthentication from '../middlewares/checkAuthentication';
import articleExist from '../middlewares/articleExist';

const router = express.Router();

router.post(
  '/:articleId/likes',
  checkAuthentication,
  articleExist,
  LikesController.likesArticles
);

router.get(
  '/:articleId/likes',
  checkAuthentication,
  articleExist,
  LikesController.getAriticles
);

router.post(
  '/:articleId/comments/:commentId/likes',
  checkAuthentication,
  articleExist,
  LikesController.likesComments
);

router.get(
  '/:articleId/comments/:commentId/likes',
  checkAuthentication,
  articleExist,
  LikesController.likedComments
);

export default router;
