const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// All product routes require authentication
router.use(authMiddleware()); // no role restriction here; all authenticated users allowed

router.post('/', productController.addProduct);
router.put('/:id/quantity', productController.updateQuantity);
router.get('/', productController.getProducts);

module.exports = router;
