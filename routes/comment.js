import express from 'express';
import CommentValidation from '../middlewares/CommentValidation';
import checkAuthentication from '../middlewares/checkAuthentication';
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

router.get('/:identifier/comments', checkAuthentication, checkArticle, checkArticleId, list);
router.post('/:identifier/comments', checkAuthentication, checkArticleId, checkCommentContent, checkArticle, create);
router.delete('/:identifier/comments/:commentId', checkAuthentication, checkArticle, checkCommentId, checkCommentParams, archive);

export default router;
