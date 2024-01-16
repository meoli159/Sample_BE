import express from 'express';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
} from '../../controllers/v1/product.js';
import { isAllowedRoleMiddleware } from '../../middlewares/authMiddleware.js';
import { uploadImage } from '../../utils/cloudinary.js';

const productRoutes = express.Router();

//Public route
productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', getProductDetail);

//Protected route
productRoutes.use(uploadImage.single('img'));
productRoutes.post('/', isAllowedRoleMiddleware('admin', 'staff'), createProduct);
productRoutes.patch('/:id', isAllowedRoleMiddleware('admin', 'staff'), updateProduct);
productRoutes.delete('/:id', isAllowedRoleMiddleware('admin'), deleteProduct);
export { productRoutes };
