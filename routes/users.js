import express from 'express';
import UserController from '../controllers/UsersController';


const router = express.Router();
router.get('/authors', UserController.list);

export default router;
