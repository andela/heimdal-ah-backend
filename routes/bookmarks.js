import express from 'express';
import BookmarksController from '../controllers/BookmarksController';
import bookmarkValidate from '../middlewares/bookmarksValidate';
import tokenDecoded from '../middlewares/tokenDecoded';
// import checkAuthentication from '../middlewares/checkAuthentication';

const router = express.Router();

router.get(
  '/',
  // checkAuthentication,
  tokenDecoded,
  BookmarksController.getAll
);
router.post(
  '/:articleId',
  // checkAuthentication,
  tokenDecoded,
  bookmarkValidate,
  BookmarksController.create
);
router.get(
  '/search',
  // checkAuthentication,
  tokenDecoded,
  BookmarksController.search
);
router.delete(
  '/:bookmarkId',
  // checkAuthentication,
  tokenDecoded,
  BookmarksController.delete
);

export default router;
