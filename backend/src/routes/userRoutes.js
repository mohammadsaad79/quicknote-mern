const express = require('express');
const router = express.Router();
const { register, login, logout, updateProfile, deleteAccount, forgotPassword, resetPassword } = require('../controllers/userController');
const { protect } = require('../auth/authMiddleware');

router.post('/auth/signup', register);
router.post('/auth/login', login);
router.post('/auth/logout', protect, logout);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password/:token', resetPassword);
router.put('/auth/profile', protect, updateProfile);
router.delete('/auth/delete-account', protect, deleteAccount);

module.exports = router;