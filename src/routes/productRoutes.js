import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { upload } from '../middleware/upload.js';
import { productSchema, updateProductSchema } from '../validators/productValidator.js';

import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/', protect, upload.single('image'), validate(productSchema), addProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, upload.single('image'), validate(updateProductSchema), updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;