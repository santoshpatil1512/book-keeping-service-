// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        // Handle Mongoose validation errors
        return res.status(400).json({ message: err.message });
    }

    // Handle other errors
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
