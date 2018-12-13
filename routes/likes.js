import express from 'express';
import LikesController from '../controllers/LikesController';
import checkAuthentication from '../middlewares/checkAuthentication';

const router = express.Router();

router.post(
  '/:articleId',
  checkAuthentication,
  LikesController.likesArticles
);
