import express from 'express';
import BookmarksController from '../controllers/BookmarksController';
import bookmarkValidate from '../middlewares/bookmarksValidate';
import checkAuthentication from '../middlewares/checkAuthentication';
import articleExist from '../middlewares/articleExist';

const router = express.Router();

router.get(
  '/',
  checkAuthentication,
  BookmarksController.getAll
);
router.post(
  '/:articleId',
  checkAuthentication,
  articleExist,
  bookmarkValidate,
  BookmarksController.create
);
router.get(
  '/search',
  checkAuthentication,
  BookmarksController.search
);
router.delete(
  '/:bookmarkId',
  checkAuthentication,
  BookmarksController.delete
);

export default router;
