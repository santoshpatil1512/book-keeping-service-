// libraries/routes/index.js
const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const { authMiddleware } = require('../../middlewares/auth'); // Importing named export

// Public routes
router.get('/', libraryController.getLibraries);
router.get('/:id', libraryController.getLibraryById);

// Protected routes
router.post('/', authMiddleware, libraryController.createLibrary);
router.put('/:id', authMiddleware, libraryController.updateLibrary);
router.delete('/:id', authMiddleware, libraryController.deleteLibrary);

// Inventory routes (Protected)
router.post('/:id/inventory', authMiddleware, libraryController.addBookToInventory);
router.delete('/:id/inventory/:bookId', authMiddleware, libraryController.removeBookFromInventory);

module.exports = router;
