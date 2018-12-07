import express from 'express';
import bodyParser from 'body-parser';
import UserController from '../controllers/UsersController';
import userController from '../controllers/PasswordResetController';
import { passwordReset, validEmail } from '../middlewares/passwordReset';

const router = express.Router();
router.get('/authors', UserController.list);
router.post('/', validEmail, userController.forgotPassword);
router.put('/resetpassword/:token', passwordReset, userController.resetPassword);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

export default router;
