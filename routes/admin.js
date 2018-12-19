import express from 'express';
import checkAuthentication from '../middlewares/checkAuthentication';
import RolesController from '../controllers/RolesController';
import adminGuard from '../middlewares/adminGuard';

const router = express.Router();

router.get('/users', checkAuthentication, adminGuard, RolesController.getUsers);
router.get('/users/:userId', checkAuthentication, adminGuard, RolesController.getAUser);
router.put('/users/:userId', checkAuthentication, adminGuard, RolesController.update);

export default router;
