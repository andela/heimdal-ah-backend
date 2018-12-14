import express from 'express';
import CommentValidation from '../middlewares/CommentValidation';
import ensureAuthenticated from '../middlewares/checkAuthentication';
import CommentController from '../controllers/CommentController';
import checkArticle from '../middlewares/checkArticle';

const {
  checkCommentContent,
  checkCommentId,
  checkCommentParams,
  checkArticleId
} = CommentValidation;
const { create, list, archive } = CommentController;
const router = express.Router();

router.get('/:id/comments', ensureAuthenticated, checkArticleId, checkArticle, list);
router.post('/:id/comments', ensureAuthenticated, checkCommentContent, checkArticle, create);
router.delete('/:articleId/comments/:commentId', ensureAuthenticated, checkCommentId, checkCommentParams, archive);

export default router;
