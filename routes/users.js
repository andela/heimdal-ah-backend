import express from 'express';

import UsersController from '../controllers/UsersController';

const router = express.Router();

/**
 * Verify the users email
 */
router.get('/verify-email/:emailToken', UsersController.verifyEmail);

export default router;
