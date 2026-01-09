const express = require('express');
const { sendMessage } = require('../controllers/contactController');
const { protect } = require('../auth/authMiddleware');
const router = express.Router();

router.post('/contact', protect, sendMessage);

module.exports = router;