import express from 'express';

import AuthController from '../controllers/AuthController';

/**
 * Attempt To Signup A New User
 */
import UserValidation from '../middlewares/UserValidation';

const router = express.Router();
router.post('/signup', UserValidation.validateUserSignUp, AuthController.signUp);

export default router;
