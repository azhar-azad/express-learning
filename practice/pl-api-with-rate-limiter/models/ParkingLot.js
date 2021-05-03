const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const parkingLotSchema = new Schema({
    carNumber: {
        type: String,
        required: true,
        unique: true
    },
    slotNumber: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('ParkingLot', parkingLotSchema);