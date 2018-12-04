import express from 'express';
import passport from 'passport';

import getTokenController from '../controllers/getTokenController';
import UserValidation from '../middlewares/UserValidation';
import authController from '../controllers/AuthController';

const router = express.Router();

router.post(
  '/login',
  UserValidation.validateUserLogin,
  authController.login
);

router.post(
  '/signup',
  UserValidation.validateUserSignUp,
  authController.signUp
);

router.get(
  '/google/callback',
  passport.authenticate('google'),
  getTokenController
);

router.get(
  '/google',
  passport.authenticate(
    'google',
    {
      scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email']
    }
  )
);

router.get(
  '/facebook',
  passport.authenticate(
    'facebook',
    {
      scope: ['email']
    }
  )
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook'),
  getTokenController
);

router.get(
  '/twitter/callback',
  passport.authenticate('twitter'),
  getTokenController
);

router.get(
  '/twitter',
  passport.authenticate('twitter')
);

export default router;
