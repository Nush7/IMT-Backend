const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

// User signup validation (username only)
const validateSignup = [
    body('username')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Username must be between 2 and 50 characters'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

    handleValidationErrors
];

// User signin validation (username only)
const validateSignin = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required'),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),

    handleValidationErrors
];

const validateCreateProduct = [
    body('name')
        .trim()
        .notEmpty().withMessage('Product name is required.')
        .isString().withMessage('Product name must be a string.'),
    body('type')
        .trim()
        .notEmpty().withMessage('Product type is required.')
        .isString().withMessage('Product type must be a string.'),
    body('sku')
        .trim()
        .notEmpty().withMessage('Product SKU is required.')
        .isString().withMessage('Product SKU must be a string.'),
    body('image_url')
        .trim()
        .notEmpty().withMessage('Product image URL is required.')
        .isURL().withMessage('Product image URL must be a valid URL.'),
    body('description')
        .trim()
        .notEmpty().withMessage('Product description is required.')
        .isString().withMessage('Product description must be a string.'),
    body('quantity')
        .notEmpty().withMessage('Product quantity is required.')
        .isInt({ min: 0 }).withMessage('Product quantity must be a non-negative integer.'),
    body('price')
        .notEmpty().withMessage('Product price is required.')
        .isFloat({ min: 0 }).withMessage('Product price must be a non-negative number.'),
    handleValidationErrors
];

const validateUpdateProduct = [
    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Product name cannot be empty.')
        .isString().withMessage('Product name must be a string.'),
    body('type')
        .optional()
        .trim()
        .notEmpty().withMessage('Product type cannot be empty.')
        .isString().withMessage('Product type must be a string.'),
    body('sku')
        .optional()
        .trim()
        .notEmpty().withMessage('Product SKU cannot be empty.')
        .isString().withMessage('Product SKU must be a string.'),
    body('imageUrl')
        .optional()
        .trim()
        .notEmpty().withMessage('Product image URL cannot be empty.')
        .isURL().withMessage('Product image URL must be a valid URL.'),
    body('image_url')
        .optional()
        .trim()
        .notEmpty().withMessage('Product image URL cannot be empty.')
        .isURL().withMessage('Product image URL must be a valid URL.'),
    body('description')
        .optional()
        .trim()
        .notEmpty().withMessage('Product description cannot be empty.')
        .isString().withMessage('Product description must be a string.'),
    body('quantity')
        .optional()
        .isInt({ min: 0 }).withMessage('Product quantity must be a non-negative integer.'),
    body('price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Product price must be a non-negative number.'),
    handleValidationErrors
];

module.exports = {
    validateSignup,
    validateSignin,
    validateCreateProduct,
    validateUpdateProduct,
    handleValidationErrors
};