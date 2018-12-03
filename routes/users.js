import express from 'express';

import UsersController from '../controllers/UsersController';

const router = express.Router();

/**
 * Attempt To Signup A New User
 */
router.post('/signup', UsersController.signUp);

/**
 * Verify the users email
 */
router.get('/verify-email/:emailToken', UsersController.verifyEmail);

export default router;
