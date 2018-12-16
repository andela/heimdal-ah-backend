import express from 'express';
import HighlightedTextsController from '../controllers/HighlightedTextsController';
import checkAuthentication from '../middlewares/checkAuthentication';

const router = express.Router();

router.post(
  '/:articleId/highlight',
  checkAuthentication,
  HighlightedTextsController.createHighlight
);
router.get('/:articleId/highlights', HighlightedTextsController.fetchHighlights);
router.get(
  '/:articleId/highlights/:highlightId/comments',
  HighlightedTextsController.fetchHighlightComments
);
router.put(
  '/:articleId/highlights',
  checkAuthentication,
  HighlightedTextsController.updateHighlightedIndexes
);
export default router;
