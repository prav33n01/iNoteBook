const mongoose = require('mongoose');

const connectToMongoose = mongoose.connect("mongodb://localhost:27017/iNoteBook", {useNewUrlParser: true});

module.exports = connectToMongoose;