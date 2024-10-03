import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Toast, Table } from 'react-bootstrap';
import CarForm from './components/CarForm';
import CarTable from './components/CarTable';

function App() {
    const [cars, setCars] = useState([]);
    const [oldCars, setOldCars] = useState([]); // New state for old cars
    const [carData, setCarData] = useState({
        model: '',
        make: '',
        registration: '',
        owner: '',
        color: '',
        address: '',
        year: ''
    });
    const [editing, setEditing] = useState(false);
    const [editCarId, setEditCarId] = useState(null);
    const [selectedCars, setSelectedCars] = useState([]);
    const [showToast, setShowToast] = useState(false);

    // Fetch all cars on component mount
    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = () => {
        axios.get('http://localhost:8000/api/cars')
            .then(response => setCars(response.data))
            .catch(error => console.error(error));
    };

    // Handle form submission (add or update)
    const handleSubmit = (e, car) => {
        e.preventDefault();
        if (editing) {
            axios.put(`http://localhost:8000/api/cars/update/${editCarId}`, car)
                .then(() => {
                    fetchCars();
                    resetForm();
                })
                .catch(err => console.error(err));
        } else {
            axios.post('http://localhost:8000/api/cars/add', car)
                .then(() => {
                    fetchCars();
                    resetForm();
                })
                .catch(err => console.error(err));
        }
    };

    const resetForm = () => {
        setCarData({
            model: '',
            make: '',
            registration: '',
            owner: '',
            color: '',
            address: '',
            year: ''
        });
        setEditing(false);
        setEditCarId(null);
    };

    // Select car for editing
    const selectCarForEdit = (car) => {
        setCarData(car);
        setEditing(true);
        setEditCarId(car._id);
    };

    // Update car data in state for selected cars
    const updateCarData = (carId, field, value) => {
        setCars(prevCars =>
            prevCars.map(car =>
                car._id === carId ? { ...car, [field]: value } : car
            )
        );
    };

    // Handle selecting multiple cars for bulk update
    const toggleSelectCar = (id) => {
        if (selectedCars.includes(id)) {
            setSelectedCars(selectedCars.filter(carId => carId !== id));
        } else {
            setSelectedCars([...selectedCars, id]);
        }
    };

    // Update multiple cars
    const updateMultipleCars = () => {
        if (selectedCars.length > 0) {
            const updateData = selectedCars.map(carId => {
                const car = cars.find(c => c._id === carId);
                return {
                    _id: carId,
                    address: car.address,
                    color: car.color,
                    make: car.make,
                    model: car.model,
                    owner: car.owner,
                    registration: car.registration,
                    year: car.year,
                };
            });

            // Log the data that is being sent to the server
            console.log("IDs to be updated:", selectedCars);
            console.log("Update data being sent:", updateData);

            axios.put(`http://localhost:8000/api/cars/update-multiple`, { ids: selectedCars, updateData })
                .then(() => {
                    fetchCars();
                    setSelectedCars([]); // Clear selection
                    setShowToast(true); // Show toast notification
                })
                .catch(err => {
                    console.error("Error updating multiple cars:", err);
                });
        } else {
            alert("Please select cars to update.");
        }
    };

    // Delete a car
    const deleteCar = (id) => {
        axios.delete(`http://localhost:8000/api/cars/delete/${id}`)
            .then(() => {
                fetchCars();
            })
            .catch(err => console.error(err));
    };

    // Function to fetch cars older than 5 years
    const fetchOldCars = () => {
        axios.get('http://localhost:8000/api/cars/old-cars')
            .then(response => setOldCars(response.data))
            .catch(error => console.error(error));
    };

    // Render a table for old cars
    const renderOldCarsTable = () => (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Model</th>
                    <th>Make</th>
                    <th>Registration</th>
                    <th>Owner</th>
                </tr>
            </thead>
            <tbody>
                {oldCars.map(car => (
                    <tr key={car._id}>
                        <td>{car.model}</td>
                        <td>{car.make}</td>
                        <td>{car.registration}</td>
                        <td>{car.owner}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

    return (
        <Container className='p-4' fluid>
            <h1 className="mt-5">Car Inventory</h1>

            {/* Car Form */}
            <CarForm carData={carData} handleSubmit={handleSubmit} editing={editing} />

            {/* Update Selected Button */}
            <Button
                variant="primary"
                onClick={updateMultipleCars}
                disabled={selectedCars.length === 0}
                className="mb-3"
            >
                Update {selectedCars.length} selected
            </Button>

            <CarTable
                cars={cars}
                deleteCar={deleteCar}
                toggleSelectCar={toggleSelectCar}
                selectedCars={selectedCars}
                updateCarData={updateCarData}
                selectCarForEdit={selectCarForEdit}
            />

            {/* Button to fetch cars older than 5 years */}
            <Button
                variant="secondary"
                onClick={fetchOldCars}
                className="mb-3"
            >
                Show cars older than 5 years
            </Button>

            {/* Render Old Cars Table */}
            {oldCars.length > 0 && renderOldCarsTable()}

            {/* Toast notification */}
            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                style={{ position: 'absolute', top: 20, right: 20 }}
            >
                <Toast.Header>
                    <strong className="mr-auto">Success</strong>
                </Toast.Header>
                <Toast.Body>Selected cars updated successfully!</Toast.Body>
            </Toast>
        </Container>
    );
}

export default App;
