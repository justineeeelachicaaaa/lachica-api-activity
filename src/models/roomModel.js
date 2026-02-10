const mongoose = require('mongoose');

//Rule Book
const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true,
        unique: true,
        min: [100, 'Room number must be 3 digits']
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
    maintenanceLog: [
        {
            date: { type: Date, default:Date.now},
            issue: String,
            fixed: Boolean
        }
    ],
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest' // Connects to Guest model
    },
    features: [String],
});

module.exports = mongoose.model('Room', roomSchema);