import express from 'express';

import AuthController from '../controllers/AuthController';
import UserValidation from '../middlewares/UserValidation';

const router = express.Router();

router.post('/signup', UserValidation.validateUserSignUp, AuthController.signUp);
router.post('/login', UserValidation.validateUserLogin, AuthController.login);

export default router;
