// books/routes/index.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authMiddleware } = require('../../middlewares/auth'); // Importing named export
const upload = require('../../configs/multer');

// Public routes
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);

// Protected routes
router.post('/', authMiddleware, upload.single('coverImage'), bookController.createBook);
// router.post('/', authMiddleware, bookController.createBook);
// router.put('/:id', authMiddleware, bookController.updateBook);
router.put('/:id', authMiddleware, upload.single('coverImage'), bookController.updateBook);

router.delete('/:id', authMiddleware, bookController.deleteBook);

module.exports = router;
