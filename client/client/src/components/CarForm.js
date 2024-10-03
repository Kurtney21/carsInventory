import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function CarForm({ carData, handleSubmit, editing }) {
    const [car, setCar] = useState(carData);

    useEffect(() => {
        setCar(carData); // Update form fields when editing a car
    }, [carData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar({
            ...car,
            [name]: value
        });
    };

    return (
        <Card className='p-4 m-4'>
            <Form onSubmit={(e) => handleSubmit(e, car)} className="mt-4 mb-5">
                <Form.Group>
                    <Form.Label>Model</Form.Label>
                    <Form.Control
                        type="text"
                        name="model"
                        value={car.model}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Make</Form.Label>
                    <Form.Control
                        type="text"
                        name="make"
                        value={car.make}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Registration</Form.Label>
                    <Form.Control
                        type="text"
                        name="registration"
                        value={car.registration}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Owner</Form.Label>
                    <Form.Control
                        type="text"
                        name="owner"
                        value={car.owner}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                        type="text"
                        name="color"
                        value={car.color}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={car.address}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type="number"
                        name="year"
                        value={car.year}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className='mt-3'>
                    {editing ? 'Update Car' : 'Add Car'}
                </Button>
            </Form>
        </Card>
    );
}

export default CarForm;
