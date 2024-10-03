import React from 'react';
import { Table, Button } from 'react-bootstrap';

function CarTable({ cars, deleteCar, toggleSelectCar, selectedCars, updateCarData }) {
    const handleChange = (carId, field, value) => {
        updateCarData(carId, field, value); // Propagate changes upwards
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>Model</th>
                    <th>Make</th>
                    <th>Registration</th>
                    <th>Owner</th>
                    <th>Color</th>
                    <th>Address</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {cars.map(car => (
                    <tr key={car._id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedCars.includes(car._id)}
                                onChange={() => toggleSelectCar(car._id)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={car.model}
                                onChange={(e) => handleChange(car._id, 'model', e.target.value)}
                                disabled={!selectedCars.includes(car._id)} // Disable if not selected
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={car.make}
                                onChange={(e) => handleChange(car._id, 'make', e.target.value)}
                                disabled={!selectedCars.includes(car._id)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={car.registration}
                                onChange={(e) => handleChange(car._id, 'registration', e.target.value)}
                                disabled={!selectedCars.includes(car._id)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={car.owner}
                                onChange={(e) => handleChange(car._id, 'owner', e.target.value)}
                                disabled={!selectedCars.includes(car._id)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={car.color}
                                onChange={(e) => handleChange(car._id, 'color', e.target.value)}
                                disabled={!selectedCars.includes(car._id)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={car.address}
                                onChange={(e) => handleChange(car._id, 'address', e.target.value)}
                                disabled={!selectedCars.includes(car._id)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={car.year}
                                onChange={(e) => handleChange(car._id, 'year', e.target.value)}
                                disabled={!selectedCars.includes(car._id)}
                            />
                        </td>
                        <td>
                            <Button variant="danger" onClick={() => deleteCar(car._id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default CarTable;
