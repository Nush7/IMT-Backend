const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const authMiddleware = require('../middleware/auth');
const { validateCreateProduct, validateUpdateProduct } = require('../middleware/validation');

router.post('/v1/', authMiddleware('admin'), validateCreateProduct, productController.createProduct);
router.put('/v1/:id', authMiddleware('admin'), validateUpdateProduct, productController.updateProduct);
router.put('/v1/:id/quantity', authMiddleware('admin'), productController.updateQuantity);
router.delete('/v1/:id', authMiddleware('admin'), productController.deleteProduct);
router.post('/v1/checkout', authMiddleware(), productController.checkout);
router.get('/v1/', productController.getProducts);
router.get('/v1/analytics', authMiddleware('admin'), productController.getAnalytics);

module.exports = router;