import express from 'express';
import CommentValidation from '../middlewares/CommentValidation';
import ensureAuthenticated from '../middlewares/checkAuthentication';
import CommentController from '../controllers/CommentController';
import articleExist from '../middlewares/articleExist';

const {
  checkCommentContent,
  checkCommentId,
  checkCommentParams,
  checkArticleId
} = CommentValidation;
const { create, list, archive } = CommentController;
const router = express.Router();

router.get('/:id/comments', ensureAuthenticated, checkArticleId, articleExist, list);
router.post('/:id/comments', ensureAuthenticated, checkCommentContent, articleExist, create);
router.delete('/:articleId/comments/:commentId', ensureAuthenticated, checkCommentId, checkCommentParams, archive);

export default router;
