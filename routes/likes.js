import express from 'express';
import LikesController from '../controllers/LikesController';
import checkAuthentication from '../middlewares/checkAuthentication';
import isUservalidate from '../middlewares/isUserValidate';

const router = express.Router();

router.post(
  '/:articleId/likes',
  checkAuthentication,
  isUservalidate,
  LikesController.likesArticles
);

router.get(
  '/:articleId/likes',
  checkAuthentication,
  isUservalidate,
  LikesController.getAriticles
);

router.post(
  '/:articleId/comments/:commentId/likes',
  checkAuthentication,
  isUservalidate,
  LikesController.likesComments
);

// router.get(
//   '/:articleId',
//   checkAuthentication,
//   isUservalidate,
//   LikesController.getAriticles
// );

export default router;
