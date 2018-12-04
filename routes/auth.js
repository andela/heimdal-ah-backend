import express from 'express';
import bodyParser from 'body-parser';
import authController from '../controllers/AuthController';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/signup', authController.signUp);

export default router;
