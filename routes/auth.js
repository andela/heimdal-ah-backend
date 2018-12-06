import express from 'express';
import bodyParser from 'body-parser';
import authController from '../controllers/AuthController';
import UserValidation from '../middlewares/UserValidation';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/auth/signup', UserValidation.validateUserSignUp, authController.signUp);
router.post('/auth/login', UserValidation.validateUserLogin, authController.login);

export default router;
