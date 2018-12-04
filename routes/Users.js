import express from 'express';
import bodyParser from 'body-parser';
import userController from '../controllers/passwordResetController';
import { passwordReset, validEmail } from '../middlewares/passwordReset';

const router = express.Router();

router.post('/forgotpassword', validEmail, userController.forgotPassword);
router.put('/resetpassword/:token', passwordReset, userController.resetPassword);


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
export default router;
