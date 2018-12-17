import express from 'express';
import BookmarksController from '../controllers/BookmarksController';
import bookmarkValidate from '../middlewares/bookmarksValidate';
import checkAuthentication from '../middlewares/checkAuthentication';
import articleExist from '../middlewares/articleExist';

const router = express.Router();

router.get(
  '/bookmarks/all',
  checkAuthentication,
  BookmarksController.getAll
);
router.post(
  '/:articleId/bookmarks',
  checkAuthentication,
  articleExist,
  bookmarkValidate,
  BookmarksController.create
);
router.get(
  '/bookmarks/search',
  checkAuthentication,
  BookmarksController.search
);
router.delete(
  '/bookmarks/:bookmarkId',
  checkAuthentication,
  BookmarksController.delete
);

export default router;
