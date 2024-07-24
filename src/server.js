// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
connectDB();

// Routes
app.use('/api/books', require('./books/routes'));
app.use('/api/users', require('./users/routes'));
app.use('/api/libraries', require('./libraries/routes'));
app.use('/api/borrow', require('./borrowing/routes'));

// Error Handling Middleware
app.use(require('./middlewares/errorHandler'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
