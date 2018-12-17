import express from 'express';
import CommentValidation from '../middlewares/CommentValidation';
import checkAuthenticated from '../middlewares/checkAuthentication';
import CommentController from '../controllers/CommentController';
import CommentHistoriesController from '../controllers/CommentHistoriesController';
import articleExist from '../middlewares/articleExist';

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

router.get('/:id/comments', checkAuthenticated, checkArticleId, articleExist, list);
router.post('/:id/comments', checkAuthenticated, checkCommentContent, articleExist, create);
router.delete('/:articleId/comments/:commentId', checkAuthenticated, checkCommentId, checkCommentParams, archive);

router.get(
  '/:articleId/comments/:commentId',
  [
    checkAuthenticated,
    checkCommentId
  ],
  getACommentHistory
);

router.put(
  '/:articleId/comments/:commentId',
  [
    checkAuthenticated,
    checkCommentId,
    checkCommentContent,
  ],
  createCommentHistory
);

export default router;
