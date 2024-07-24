// utils/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../path/to/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "your-bucket-name.appspot.com"
});

const bucket = admin.storage().bucket();

const uploadImage = async (filePath) => {
    const response = await bucket.upload(filePath);
    return response[0].metadata.mediaLink;
};

module.exports = { uploadImage };
