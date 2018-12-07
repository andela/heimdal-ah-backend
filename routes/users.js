import express from 'express';

import PasswordController from '../controllers/PasswordController';
import { passwordReset, validEmail } from '../middlewares/passwordReset';

import UsersController from '../controllers/UsersController';

const router = express.Router();

router.post('/', validEmail, PasswordController.forgotPassword);
router.put('/resetpassword/:token', passwordReset, PasswordController.resetPassword);
router.get('/authors', UsersController.list);

/**
 * Verify the users email
 */
router.get('/verify-email/:emailToken', UsersController.verifyEmail);

export default router;
