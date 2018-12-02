import express from 'express';
import Users from '../controllers/UsersController';
import { checkUsersId, validProfileInput } from '../middlewares/UsersMiddleware';

const router = express.Router();

router.get('/:username', Users.viewProfile);

router.post('/:userId', checkUsersId, validProfileInput, Users.createProfile);

router.put('/:username', Users.updateProfile);

export default router;
