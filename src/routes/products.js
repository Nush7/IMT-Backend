/**
 * @swagger
 * /products/v1/:
 *   get:
 *     summary: List products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *   post:
 *     summary: Create product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               sku:
 *                 type: string
 *               image_url:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Product with this SKU already exists
 */

/**
 * @swagger
 * /products/v1/{id}:
 *   put:
 *     summary: Update product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Product with this SKU already exists
 */

/**
 * @swagger
 * /products/v1/{id}/quantity:
 *   put:
 *     summary: Update product quantity (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product quantity updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /products/v1/checkout:
 *   post:
 *     summary: Checkout product (user)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Checkout successful
 *       400:
 *         description: Validation error or insufficient quantity
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /products/v1/analytics:
 *   get:
 *     summary: Inventory analytics (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *       401:
 *         description: Unauthorized
 */

const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const authMiddleware = require('../middleware/auth');
const { validateCreateProduct, validateUpdateProduct } = require('../middleware/validation');

router.post('/v1/', authMiddleware('admin'), validateCreateProduct, productController.createProduct);
router.put('/v1/:id', authMiddleware('admin'), validateUpdateProduct, productController.updateProduct);
router.put('/v1/:id/quantity', authMiddleware('admin'), productController.updateQuantity);
router.post('/v1/checkout', authMiddleware(), productController.checkout);
router.get('/v1/', productController.getProducts);
router.get('/v1/analytics', authMiddleware('admin'), productController.getAnalytics);

module.exports = router;