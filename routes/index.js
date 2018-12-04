import express from 'express';
import userRoute from './users';
import authRoute from './auth';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);

export default router;
