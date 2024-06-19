import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import Header from '../Header/Header';
import '../../index.css';
import { useNavigate } from 'react-router-dom';

function ReservationPage() {
    const navigate = useNavigate();
    const now = new Date();
    now.setMinutes(0, 0, 0); // Round down to the nearest hour
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const [startDate, setStartDate] = useState(now.toISOString().substring(0,16));
    const [endDate, setEndDate] = useState(twoHoursLater.toISOString().substring(0,16));
    const [capacity, setCapacity] = useState(1);
    const [equipmentList, setEquipmentList] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        fetch('http://localhost:8000/equipment/')
            .then(response => response.json())
            .then(data => {
                setEquipmentList(data);
                const initialFilters = data.reduce((acc, equipment) => {
                    acc[equipment.name] = false;
                    return acc;
                }, {});
                setFilters(initialFilters);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    useEffect(() => {
        const start = new Date(startDate);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
        setEndDate(end.toISOString().substring(0,16));
    }, [startDate]);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.checked });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(startDate, endDate, capacity, filters);
        navigate('/availablerooms', { state: { startDate, endDate, capacity, equipment: filters } });
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Reservation</h2>
                <div className="grid grid-cols-2 gap-4">
                    <label className="flex flex-col space-y-1">
                        <span className="text-gray-700">Start Date</span>
                        <input type="datetime-local" value={startDate} onChange={handleStartDateChange}
                               className="p-2 border rounded"/>
                    </label>
                    <label className="flex flex-col space-y-1">
                        <span className="text-gray-700">End Date</span>
                        <input type="datetime-local" value={endDate} onChange={handleEndDateChange}
                               className="p-2 border rounded"/>
                    </label>
                    <label className="flex flex-col space-y-1 col-span-2">
                        <span className="text-gray-700">Capacity</span>
                        <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} min="1"
                               className="p-2 border rounded w-full max-w-xs"/>
                    </label>
                </div>
                <fieldset className="mt-6">
                    <legend className="text-lg font-medium mb-2">Filters</legend>
                    <div className="grid grid-cols-2 gap-4">
                        {equipmentList.map((equipment) => (
                            <label key={equipment.name} className="flex items-center">
                                <input type="checkbox" name={equipment.name} checked={filters[equipment.name]}
                                       onChange={handleFilterChange} className="mr-2"/>
                                {equipment.name.charAt(0).toUpperCase() + equipment.name.slice(1)}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <button type="submit" onClick={handleSubmit}
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Search
                </button>
            </form>
        </div>
    );
}

export default ReservationPage;