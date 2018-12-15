import express from 'express';
import CommentValidation from '../middlewares/CommentValidation';
import ensureAuthenticated from '../middlewares/checkAuthentication';
import CommentController from '../controllers/CommentController';
import { checkArticle } from '../middlewares/articleMiddleware';


const {
  checkCommentContent,
  checkCommentId,
  checkCommentParams,
  checkArticleId
} = CommentValidation;
const { create, list, archive } = CommentController;
const router = express.Router();

router.get('/:identifier/comments', ensureAuthenticated, checkArticle, checkArticleId, list);
router.post('/:identifier/comments', ensureAuthenticated, checkArticleId, checkCommentContent, checkArticle, create);
router.delete('/:identifier/comments/:commentId', ensureAuthenticated, checkArticle, checkCommentId, checkCommentParams, archive);

export default router;
