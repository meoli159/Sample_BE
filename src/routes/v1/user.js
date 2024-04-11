import express from 'express';
import {
  createUser,
  deleteUser,
  logOut,
  login,
  register,
  updateUser,
  userList,
} from '../../controllers/v1/user.js';
import { isAllowedRoleMiddleware, authMiddleware } from '../../middlewares/authMiddleware.js';

const authRoutes = express.Router();
authRoutes.post('/login', login);
authRoutes.post('/register', register);

authRoutes.use(authMiddleware);
authRoutes.post('/logout', logOut);
authRoutes.get('/users', authMiddleware, isAllowedRoleMiddleware('admin'), userList);
authRoutes.post('/user', authMiddleware, isAllowedRoleMiddleware('admin'), createUser);
authRoutes.patch('/user/:id', authMiddleware, updateUser);
authRoutes.delete('/user/:id', authMiddleware, isAllowedRoleMiddleware('admin'), deleteUser);
export { authRoutes };
