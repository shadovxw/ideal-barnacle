const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logOut);
router.get('/is-auth', authMiddleware, authController.isUserAuthenticate);

router.post('/send-verify-otp', authMiddleware, authController.sendVerifyOtp);
router.post('/verify-otp', authMiddleware, authController.verifyOtp);

router.post('/send-reset-otp', authController.sendResetOtp);
router.post('/verify-reset-otp', authController.verifyResetOtp);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
