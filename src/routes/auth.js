const express = require('express');
const { validateSignup, validateSignin } = require('../middleware/validation');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/v1/signup', validateSignup, authController.signup);
router.post('/v1/signin', validateSignin, authController.signin);
router.post('/v1/logout', authController.logout);

module.exports = router;