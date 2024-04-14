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
// authRoutes.get('/users', userList);
authRoutes.use(authMiddleware);
authRoutes.post('/logout', logOut);

authRoutes.patch('/user/:id', updateUser);
authRoutes.post('/user', isAllowedRoleMiddleware('admin'), createUser);
authRoutes.get('/users', isAllowedRoleMiddleware('admin'), userList);
authRoutes.delete('/user/:id', isAllowedRoleMiddleware('admin'), deleteUser);
export { authRoutes };
