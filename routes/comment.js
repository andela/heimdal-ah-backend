import express from 'express';
import CommentValidation from '../middlewares/CommentValidation';
import ensureAutheticated from '../middlewares/checkAuthentication';
import CommentController from '../controllers/CommentController';

const { checkCommentContent, checkCommentId } = CommentValidation;
const { createComment, listAllComment, deleteAComment } = CommentController;
const router = express.Router();

router.get('/:slug/comments', ensureAutheticated, listAllComment);
router.post('/:slug/comments', ensureAutheticated, checkCommentContent, createComment);
router.delete('/:slug/comments/:id', ensureAutheticated, checkCommentId, deleteAComment);

export default router;
