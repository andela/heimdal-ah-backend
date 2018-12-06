import express from 'express';

import PasswordResetController from '../controllers/PasswordResetController';
import { passwordReset, validEmail } from '../middlewares/passwordReset';

import UsersController from '../controllers/UsersController';

const router = express.Router();

router.post('/', validEmail, PasswordResetController.forgotPassword);
router.put('/resetpassword/:token', passwordReset, PasswordResetController.resetPassword);
router.get('/authors', UsersController.list);

/**
 * Verify the users email
 */
router.get('/verify-email/:emailToken', UsersController.verifyEmail);

export default router;
