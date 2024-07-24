const Book = require('../models/Book');
const Library = require('../../libraries/models/Library');
const { uploadImage } = require('../../utils/cloudinary');
const fs = require('fs');

// Create a new book
exports.createBook = async (req, res, next) => {
    try {
        let imageUrl = '';

        if (req.file) {
            const filePath = req.file.path;
            imageUrl = await uploadImage(filePath);
            fs.unlinkSync(filePath);
        }

        const { library, ...bookData } = req.body;

        const newBook = new Book({ ...bookData, coverImage: imageUrl, library });
        const savedBook = await newBook.save();

        // Update the library with the new book
        await Library.findByIdAndUpdate(library, { $push: { books: savedBook._id } });

        res.status(201).json(savedBook);
    } catch (error) {
        next(error);
    }
};

// Get all books
exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.find().populate('author library borrower', 'name');
        res.json(books);
    } catch (error) {
        next(error);
    }
};

// Get a book by ID
exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id).populate('author library borrower', 'name');
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        next(error);
    }
};

// Update an existing book
exports.updateBook = async (req, res, next) => {
    try {
        // Check if file is provided
        let imageUrl = '';
        if (req.file) {
            const filePath = req.file.path;
            imageUrl = await uploadImage(filePath);
            fs.unlinkSync(filePath);
        }

        const { id } = req.params; // Book ID from URL
        const { library, ...updateData } = req.body;

        // Find the book and update it
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            {
                ...updateData,
                ...(imageUrl && { coverImage: imageUrl }), // Only update coverImage if new image is provided
                ...(library && { library }) // Update library reference if provided
            },
            { new: true } // Return the updated document
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // If library was updated, update the library record
        if (library) {
            await Library.findByIdAndUpdate(library, { $addToSet: { books: updatedBook._id } }, { new: true });
        }

        res.json(updatedBook);
    } catch (error) {
        next(error);
    }
};


// Delete a book by its ID
exports.deleteBook = async (req, res, next) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted' });
    } catch (error) {
        next(error);
    }
};

