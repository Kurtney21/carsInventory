const Car = require('../models/car.model');

// Add a new car
exports.addCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).send('Car added successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Update a single car
exports.updateCar = async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedCar);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Update multiple cars
exports.updateMultipleCars = async (req, res) => {
    const { ids, updateData } = req.body;

    try {
        // Ensure both ids and updateData are provided
        if (!ids || ids.length === 0) {
            return res.status(400).json({ message: 'No cars selected for update.' });
        }
        if (!updateData || !Array.isArray(updateData) || updateData.length !== ids.length) {
            return res.status(400).json({ message: 'No update data provided or not in the correct format.' });
        }

        // Prepare update operations
        const updateOps = updateData.map((data, index) => {
            return {
                updateOne: {
                    filter: { _id: ids[index] },  // Match the ID from the ids array
                    update: { $set: { 
                        address: data.address,
                        color: data.color,
                        make: data.make,
                        model: data.model,
                        owner: data.owner,
                        registration: data.registration,
                        year: data.year 
                    } }
                }
            };
        });

        // Execute bulk updates
        await Car.bulkWrite(updateOps);

        res.status(200).json({ message: 'Cars updated successfully!' });
    } catch (error) {
        console.error("Error in updateMultipleCars:", error); // More specific error logging
        res.status(500).json({ message: 'Error updating cars.' });
    }
};

// Delete a car
exports.deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.send('Car deleted');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// List all cars
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.send(cars);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// List cars older than 5 years
exports.getOldCars = async (req, res) => {
    const currentYear = new Date().getFullYear();
    try {
        const oldCars = await Car.find({ year: { $lt: currentYear - 5 } }, 'model make registration owner');
        res.send(oldCars);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
