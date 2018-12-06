import express from 'express';
import PasswordController from '../controllers/PasswordController';
import { passwordReset, validEmail } from '../middlewares/passwordReset';

const router = express.Router();

router.post('/forgotpassword', validEmail, PasswordController.forgotPassword);
router.put('/resetpassword/:token', passwordReset, PasswordController.resetPassword);

export default router;
