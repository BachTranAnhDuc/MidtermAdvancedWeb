const mongoose = require('mongoose')

const connectDB = (url) => {
    return mongoose
        .connect(url)
        .then(() => {
            console.log('Connect to DB success');
        })
        .catch((err) => {
            console.log(`Something went wrong ${err}`);
        });
};

module.exports = connectDB;