// libraries/controllers/libraryController.js
const Library = require('../models/Library');
const Book = require('../../books/models/Book');
const { validateLibraryInput } = require('../validators/libraryValidator');

// Get all libraries
exports.getLibraries = async (req, res, next) => {
    try {
        const libraries = await Library.find().populate('books', 'title');
        res.json(libraries);
    } catch (error) {
        next(error);
    }
};

// Get a library by ID
exports.getLibraryById = async (req, res, next) => {
    try {
        const library = await Library.findById(req.params.id).populate('books', 'title');
        if (!library) return res.status(404).json({ message: 'Library not found' });
        res.json(library);
    } catch (error) {
        next(error);
    }
};

// Create a new library
exports.createLibrary = async (req, res, next) => {
    const { error } = validateLibraryInput(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const newLibrary = new Library(req.body);
        const savedLibrary = await newLibrary.save();
        res.status(201).json(savedLibrary);
    } catch (error) {
        next(error);
    }
};

// Update a library by ID
exports.updateLibrary = async (req, res, next) => {
    const { error } = validateLibraryInput(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const updatedLibrary = await Library.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLibrary) return res.status(404).json({ message: 'Library not found' });
        res.json(updatedLibrary);
    } catch (error) {
        next(error);
    }
};

// Delete a library by ID
exports.deleteLibrary = async (req, res, next) => {
    try {
        const deletedLibrary = await Library.findByIdAndDelete(req.params.id);
        if (!deletedLibrary) return res.status(404).json({ message: 'Library not found' });
        res.json({ message: 'Library deleted' });
    } catch (error) {
        next(error);
    }
};

// Add a book to the library's inventory
exports.addBookToInventory = async (req, res, next) => {
    try {
        const library = await Library.findById(req.params.id);
        if (!library) return res.status(404).json({ message: 'Library not found' });

        const book = await Book.findById(req.body.bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        library.books.push(book._id);
        await library.save();

        res.json(library);
    } catch (error) {
        next(error);
    }
};

// Remove a book from the library's inventory
exports.removeBookFromInventory = async (req, res, next) => {
    try {
        const library = await Library.findById(req.params.id);
        if (!library) return res.status(404).json({ message: 'Library not found' });

        const bookIndex = library.books.indexOf(req.params.bookId);
        if (bookIndex > -1) {
            library.books.splice(bookIndex, 1);
            await library.save();
        }

        res.json(library);
    } catch (error) {
        next(error);
    }
};
