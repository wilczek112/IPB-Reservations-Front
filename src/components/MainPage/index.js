import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import ActiveUser from '../Authentication/ActiveUser';
import Background from '../Background/background';

function ReservationPage({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const now = new Date();
    now.setMinutes(0, 0, 0);
    const repaire_time = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const twoHoursLater = new Date(repaire_time.getTime() + 2 * 60 * 60 * 1000);
    const [startDate, setStartDate] = useState(repaire_time.toISOString().substring(0, 16));
    const [endDate, setEndDate] = useState(twoHoursLater.toISOString().substring(0, 16));
    const [capacity, setCapacity] = useState(30);
    const [equipmentList, setEquipmentList] = useState([]);
    const [filters, setFilters] = useState({});
    const user = ActiveUser.getUser();
    const professorId = user.professorId;

    useEffect(() => {
        fetch('http://localhost:8000/equipment/')
            .then(response => response.json())
            .then(data => {
                setEquipmentList(data);
                const initialFilters = data.reduce((acc, equipment) => {
                    acc[equipment._id] = false;
                    return acc;
                }, {});
                setFilters(initialFilters);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    useEffect(() => {
        const start = new Date(startDate);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
        setEndDate(end.toISOString().substring(0, 16));
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
        navigate('/availablerooms', { state: { startDate, endDate, capacity, equipment: filters, professorId } });
    };

    return (
        <div className="relative min-h-screen">
            <Background />
            <div className="relative z-10">
                <Header setIsAuthenticated={setIsAuthenticated} />

                <form onSubmit={handleSubmit} className="relative p-4 bg-bouquet shadow-md rounded-lg max-w-xl mx-auto space-y-6 mt-8 z-10">
                    <h2 className="text-2xl font-bold mb-4 text-center text-white">Classroom search</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex flex-col space-y-1">
                            <span className="text-white">Start Date</span>
                            <input
                                type="datetime-local"
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-tapestry"
                                style={{ '--ring-color': 'var(--tapestry)' }}
                            />
                        </label>
                        <label className="flex flex-col space-y-1">
                            <span className="text-white">End Date</span>
                            <input
                                type="datetime-local"
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-tapestry"
                                style={{ '--ring-color': 'var(--tapestry)' }}
                            />
                        </label>
                        <label className="flex flex-col space-y-1 col-span-2">
                            <span className="text-white mx-auto">Capacity</span>
                            <input
                                type="number"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                min="1"
                                className="p-2 border rounded w-full w-32 mx-auto focus:outline-none focus:ring-2 focus:ring-tapestry"
                                style={{ '--ring-color': 'var(--tapestry)' }}
                            />
                        </label>
                    </div>
                    <fieldset className="mt-6">
                        <legend className="text-lg font-medium mb-2 text-white">Filters</legend>
                        <div className="grid grid-cols-2 gap-4">
                            {equipmentList.map((equipment) => (
                                <label key={equipment._id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name={equipment._id}
                                        checked={filters[equipment._id]}
                                        onChange={handleFilterChange}
                                        className="form-checkbox h-5 w-5 text-tapestry focus:outline-none"
                                    />
                                    <span className="text-white">{equipment.name}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                    <button
                        type="submit"
                        className="w-full bg-loulou text-white p-2 rounded hover:bg-tapestry focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tapestry"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ReservationPage;
