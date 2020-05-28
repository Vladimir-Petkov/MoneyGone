const mongoose = require('mongoose');
const config = require('./config');
const dbName = 'ExamSeptember';

module.exports = () => {
    return mongoose.connect(config.dbURL + dbName, { useNewUrlParser: true, useUnifiedTopology: true },
        console.log('***Database is READY!***'));
};