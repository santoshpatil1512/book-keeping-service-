// borrowing/controllers/borrowController.js
const Book = require('../../books/models/Book');
const { validateBorrowRequest } = require('../validators/borrowValidator');

// Borrow a book
exports.borrowBook = async (req, res, next) => {
    const { error } = validateBorrowRequest(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const book = await Book.findById(req.body.bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.borrower) return res.status(400).json({ message: 'Book is already borrowed' });

        book.borrower = req.user.id;
        await book.save();

        res.json({ message: 'Book borrowed successfully', book });
    } catch (error) {
        next(error);
    }
};

// Return a borrowed book
exports.returnBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.borrower.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not the borrower of this book' });
        }

        book.borrower = null;
        await book.save();

        res.json({ message: 'Book returned successfully', book });
    } catch (error) {
        next(error);
    }
};
