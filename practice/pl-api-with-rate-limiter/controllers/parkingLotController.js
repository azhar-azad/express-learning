const ParkingLot = require('../models/ParkingLot');
const config = require('../config/config');

const { sendData, sendError } = require('./messageController');

const parkingLotSize = config.PARKING_LOT_SIZE;
const slotNumbers = [];
for (let i = 0; i < parkingLotSize; i++) {
    slotNumbers.push(config.SLOT_ID + (i + 1));
}
let occupiedSlotCounter = 0;

// /park/carNumber
const parkACar = async (req, res) => {

    console.log('::: parkACarAPI :::');

    try {
        let unitToSave = null;

        let carNumber = req.params.id;
        let slotNumber;
        occupiedSlotCounter = await ParkingLot.countDocuments({});
        // console.log('occupiedSlotCounter: ' + occupiedSlotCounter);

        let unit = null;
        let isSlotOccupied = [];
        for (let i = 0; i < slotNumbers.length; i++) {
            unit = await ParkingLot.find({slotNumber:slotNumbers[i]});
            // console.log('unit: ' + unit);
            if (unit.length === 0) {
                isSlotOccupied.push(false);
            } else {
                isSlotOccupied.push(true);
            }
        }
        // console.log('isSlotOccupied: ' + isSlotOccupied);

        if (occupiedSlotCounter < slotNumbers.length) { // empty slot exists
            for (let i = 0; i < isSlotOccupied.length; i++) {
                if (!isSlotOccupied[i]) { // that slot is empty
                    slotNumber = slotNumbers[i];
                    isSlotOccupied[i] = true;

                    break;
                }
            }

            if (slotNumber) {
                let unit = {
                    carNumber,
                    slotNumber
                };
    
                unitToSave = new ParkingLot(unit);
                await unitToSave.save();
    
                sendData(res, 201, unitToSave);
            } 
            else {
                throw new Error('Parking Lot is full. No slots are available.');
            }
        }
        else {
            throw new Error('Parking Lot is full. No slots are available.');
        }

    } catch (e) {
        sendError(res, 400, e.message);
    }
};

// /unpark/slotNumber
const unParkACar = async (req, res) => {

    console.log('::: unParkACarAPI :::');

    try {
        let slotNumber = req.params.id.toUpperCase();
        // console.log('slotNumber: ' + slotNumber);
        let unit = await ParkingLot.find({slotNumber:slotNumber});
        // console.log('unit: ' + JSON.stringify(unit));
        if (unit.length === 0) {
            sendError(res, 404, 'Slot not found');
            return;
        }

        await unit[0].remove();

        sendData(res, 200, slotNumber + ' is freed');

    } catch (e) {
        sendError(res, 500, e.message);
    }
};

// /info/carNumber
// /info/slotNumber
const getInfo = async (req, res) => {

    console.log('::: getInfoAPI :::');

    try {
        let reqParam = req.params.id
        // reqParam = reqParam.toUpperCase();
        if (reqParam === null) {
            sendError(res, 404, 'Car Number/Slot Number is not passed');
            return;
        }
        // console.log('reqParam: ' + reqParam);

        let unit;
        let pos = reqParam.toUpperCase().search(config.SLOT_ID);
        // console.log('pos: ' + pos);
        if (pos !== -1) { // param is slot number
            unit = await ParkingLot.find({slotNumber:reqParam.toUpperCase()});
            // console.log('unit: ' + JSON.stringify(unit));
            if (unit.length === 0) {
                sendError(res, 404, 'Slot not found');
                return;
            }
        }
        else { // param is car number
            unit = await ParkingLot.find({carNumber:reqParam});
            if (unit.length === 0) {
                sendError(res, 404, 'Car not found');
                return;
            }
        }

        sendData(res, 200, unit);

    } catch (e) {
        sendError(res, 400, e.message);
    }
};

// /
const getRouterStatus = async (req, res) => {
    res.status(200).json({
        success: true,
        data: 'Server is online'
    });
};

module.exports = {
    parkACar,
    unParkACar,
    getInfo,
    getRouterStatus
};
