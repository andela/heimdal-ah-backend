import express from 'express';
import UserController from '../controllers/UsersController';


const router = express.Router();
router.get('/users/authors', UserController.listUsers);

export default router;
