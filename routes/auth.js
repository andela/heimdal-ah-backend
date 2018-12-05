import express from 'express';
import bodyParser from 'body-parser';
import authController from '../controllers/AuthController';
import UserValidation from '../middlewares/UserValidation';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/signup', UserValidation.validateUserSignUp, authController.signUp);

export default router;
