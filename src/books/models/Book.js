// books/models/Book.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    library: { type: Schema.Types.ObjectId, ref: 'Library', required: true },
    borrower: { type: Schema.Types.ObjectId, ref: 'User' },
    coverImage: { type: String, required: true }, // URL to Firebase image
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);


