const express = require('express');
const { validateSignup, validateSignin } = require('../middleware/validation');
const authController = require('../controller/authController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authentication
 *   - name: Products
 *     description: Product management
 */

/**
 * @swagger
 * /auth/v1/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /auth/v1/signin:
 *   post:
 *     summary: Login and receive JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signin successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/v1/logout:
 *   post:
 *     summary: Logout (client-side only)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */

router.post('/v1/signup', validateSignup, authController.signup);
router.post('/v1/signin', validateSignin, authController.signin);
router.post('/v1/logout', authController.logout);

module.exports = router;