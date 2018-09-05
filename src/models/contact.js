const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
    },
    github: {
        type: String,
        required: true
    }
});

const Contact = module.exports = mongoose.model('Contact', contactSchema);