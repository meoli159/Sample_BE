import express from 'express';
import { productRoutes } from './product.js';
import { authRoutes } from './user.js';
import { categoryRoutes } from './category.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);

export { router as routes };
