import express from 'express';
import ReplyValidation from '../middlewares/ReplyValidation';
import checkAuthentication from '../middlewares/checkAuthentication';
import RepliesController from '../controllers/RepliesController';
import CommentValidation from '../middlewares/CommentValidation';
// import { checkArticle } from '../middlewares/articleMiddleware';
const router = express.Router();

const {
  checkReplyContent, checkReplyId, checkReplyExist, checkCommentId
} = ReplyValidation;
const { checkCommentParams } = CommentValidation;

const {
  create,
  list,
  archive
} = RepliesController;

router.get('/:commentId/reply', checkAuthentication, checkCommentId, checkCommentParams, list);
router.post('/:commentId/reply', checkAuthentication, checkCommentId, checkCommentParams, checkReplyContent, create);
router.delete('/:commentId/reply/:replyId', checkAuthentication, checkReplyId, checkReplyExist, archive);

export default router;
