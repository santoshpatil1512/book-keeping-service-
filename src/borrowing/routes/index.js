// borrowing/routes/index.js
const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { authMiddleware } = require('../../middlewares/auth');

// Protected routes
router.post('/', authMiddleware, borrowController.borrowBook);
router.put('/return/:id', authMiddleware, borrowController.returnBook);

module.exports = router;
