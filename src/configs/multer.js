// config/multer.js
const multer = require('multer');
const path = require('path');

// Ensure the 'uploads' directory exists
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/'); // Directory where files are temporarily saved
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
