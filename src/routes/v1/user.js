import express from 'express';
import { deleteUser, logOut, login, register, updateUser, userList } from '../../controllers/v1/user.js';
import { isAllowedRoleMiddleware, authMiddleware } from '../../middlewares/authMiddleware.js';

const authRoutes = express.Router();
authRoutes.post('/login', login);
authRoutes.post('/register', register);

authRoutes.use(authMiddleware);
authRoutes.post('/logout', logOut);
authRoutes.patch('/user/:id', updateUser);
authRoutes.delete('/user/:id', isAllowedRoleMiddleware('admin'), deleteUser);
// authRoutes.get('/', userList);
export { authRoutes };
