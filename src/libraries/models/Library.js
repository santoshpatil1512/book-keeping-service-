// libraries/models/Library.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Library', LibrarySchema);
