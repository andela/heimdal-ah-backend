import express from 'express';
import CommentValidation from '../middlewares/CommentValidation';

const { validateAllParams } = CommentValidation;
const router = express.Router();

router.post('/:slug/comments', validateAllParams);

export default router;
