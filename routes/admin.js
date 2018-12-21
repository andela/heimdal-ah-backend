import express from 'express';
import checkAuthentication from '../middlewares/checkAuthentication';
import { checkUserRole, checkUserExist, checkUserId } from '../middlewares/RolesMiddleware';
import RolesController from '../controllers/RolesController';
import adminGuard from '../middlewares/adminGuard';


const router = express.Router();

router.get('/users', checkAuthentication, adminGuard, RolesController.getUsers);
router.get('/users/:userId', checkAuthentication, checkUserId, adminGuard, checkUserExist, RolesController.getAUser);
router.put('/users/:userId', checkAuthentication, checkUserId, adminGuard, checkUserExist, checkUserRole, RolesController.update);

export default router;
