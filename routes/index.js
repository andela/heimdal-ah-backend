import express from 'express';
import UserValidation from '../middlewares/UserValidation';
import UsersController from '../controllers/UserController';

const router = express.Router();
router.post('/users/signup', UserValidation.validateUserSignUp, UserValidation.checkEmailExist, UsersController.signUp);


export default router;
