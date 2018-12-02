import express from 'express';
import bodyParser from 'body-parser';
import signUpController from '../controllers/SignupController';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/signup', signUpController.signUpCtrl);

export default router;
