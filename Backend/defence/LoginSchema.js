const mongoose = require('mongoose');

// for creating schema, we need to create a new schema object

const LoginSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true },
    },

    password: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        Default: 'Default name',
    },

    nid: {
        type: String,
        Default: 'Default name',
    },

    address: {
        type: String,
        Default: 'Default address',
    },

    /// ////////////// Protection mechanism //////////////////////////////////

    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number },
});

module.exports = LoginSchema;
