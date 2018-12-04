import express from 'express';

import AuthController from '../controllers/AuthController';

const router = express.Router();

/**
 * Attempt To Signup A New User
 */
router.post('/signup', AuthController.signUp);

export default router;
