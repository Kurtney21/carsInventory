const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: { type: String, required: true },
    make: { type: String, required: true },
    registration: { type: String, required: true },
    owner: { type: String, required: true },
    color: { type: String, required: true },
    address: { type: String, required: true },
    year: { type: Number, required: true }
});

module.exports = mongoose.model('Car', carSchema);
