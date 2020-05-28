const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const expenseShema = new mongoose.Schema({

    merchant: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    createdAt: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    total: {
        type: mongoose.Schema.Types.Number,
        required: true
    },

    category: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    description: {
        type: mongoose.Schema.Types.String,
        required: true,
        minlength: 10,
        maxlength: 50
    },

    isChecked: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },

    creator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

});

module.exports = new mongoose.model('Expense', expenseShema);