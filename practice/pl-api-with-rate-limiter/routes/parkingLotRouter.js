const express = require('express');
const {
    parkACar,
    unParkACar,
    getInfo,
    getRouterStatus
} = require('../controllers/parkingLotController');

const parkingLotRouter = express.Router();

// Park a Car
parkingLotRouter.post('/park/:id', parkACar);

// Un-Park a car
parkingLotRouter.delete('/unpark/:id', unParkACar);

// Get Info
parkingLotRouter.get('/info/:id', getInfo);

// Get router status
parkingLotRouter.get('/test', getRouterStatus);

module.exports = parkingLotRouter;