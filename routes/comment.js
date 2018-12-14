import express from 'express';
import CommentValidation from '../middlewares/CommentValidation';
import checkAuthenticated from '../middlewares/checkAuthentication';
import CommentController from '../controllers/CommentController';
import checkArticle from '../middlewares/checkArticle';
import CommentHistoriesController from '../controllers/CommentHistoriesController';

import authoriseCommentEdit from '../middlewares/authoriseCommentEdit';

const {
  checkCommentContent,
  checkCommentId,
  checkCommentParams,
  checkArticleId
} = CommentValidation;

const {
  getACommentHistory,
  createCommentHistory
} = CommentHistoriesController;


const { create, list, archive } = CommentController;
const router = express.Router();

router.get('/:id/comments', checkAuthenticated, checkArticleId, checkArticle, list);
router.post('/:id/comments', checkAuthenticated, checkCommentContent, checkArticle, create);
router.delete('/:articleId/comments/:commentId', checkAuthenticated, checkCommentId, checkCommentParams, archive);

router.get('/:articleId/comments/:commentId',
  [
    checkAuthenticated,
    checkCommentId
  ], getACommentHistory);

router.put('/:articleId/comments/:commentId',
  [
    checkAuthenticated,
    checkCommentId,
    checkCommentContent,
  ], createCommentHistory);

export default router;
