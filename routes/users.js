import express from 'express';

import PasswordController from '../controllers/PasswordController';
import FollowersController from '../controllers/FollowersController';
import { passwordReset, validEmail } from '../middlewares/passwordReset';

import UsersController from '../controllers/UsersController';

const router = express.Router();

router.post('/', validEmail, PasswordController.forgotPassword);
router.put('/resetpassword/:token', passwordReset, PasswordController.resetPassword);
router.get('/authors', UsersController.list);

// follow user begins here
router.post('/:followingId/follow', FollowersController.followUsers);
router.post('/:followingId/unfollow', FollowersController.unfollowUser);
router.get('/follow', FollowersController.getAllFollowers);
router.get('/following', FollowersController.getAllFollowing);
/**
 * Verify the users email
 */
router.get('/verify-email/:emailToken', UsersController.verifyEmail);

export default router;
