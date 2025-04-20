const mongoose = require('mongoose');

const BirthdaySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual property to get month and day for birthday checking
BirthdaySchema.virtual('birthMonth').get(function() {
    return this.dateOfBirth.getMonth();
});

BirthdaySchema.virtual('birthDay').get(function() {
    return this.dateOfBirth.getDate();
});

module.exports = mongoose.model('Birthday', BirthdaySchema);