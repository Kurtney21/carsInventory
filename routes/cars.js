const express = require('express');
const router = express.Router();
const carController = require('../controllers/cars.controller');

router.post('/add', carController.addCar);
router.put('/update/:id', carController.updateCar);
router.put('/update-multiple', carController.updateMultipleCars);
router.delete('/delete/:id', carController.deleteCar);
router.get('/', carController.getAllCars);
router.get('/old-cars', carController.getOldCars);

module.exports = router;
