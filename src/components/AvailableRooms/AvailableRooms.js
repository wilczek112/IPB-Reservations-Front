import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Header from '../Header/Header';
import '../../index.css';
import { useLocation } from 'react-router-dom';

function AvailableRooms() {
    const location = useLocation();
    const { startDate, endDate, capacity, equipment } = location.state || {};
    const [rooms, setRooms] = useState([]);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const roomResponse = await fetch('http://localhost:8000/room');
            const reservationResponse = await fetch('http://localhost:8000/reservation');
            const roomData = await roomResponse.json();
            const reservationData = await reservationResponse.json();

            // Convert startDate and endDate to Unix timestamp format
            const startTimestamp = new Date(startDate).getTime() / 1000;
            const endTimestamp = new Date(endDate).getTime() / 1000;

            // Filter out approved or pending reservations
            const activeReservations = reservationData.filter(reservation =>
                (reservation.Status === 'Approved' || reservation.Status === 'Pending') &&
                !(reservation.EndTime <= startTimestamp || reservation.StartTime >= endTimestamp)
            );

            // Filter out rooms that are already occupied by active reservations, do not have enough capacity, or do not meet equipment preferences
            const availableRooms = roomData.filter(room => {
                // Check if the room is occupied during the desired reservation time
                const isOccupied = activeReservations.some(reservation => reservation.RoomId === room.Room);
                // Check if the room has enough capacity
                const hasEnoughCapacity = room.Capacity >= capacity;
                // Check if the room meets equipment preferences
                const meetsEquipmentPreferences = Object.keys(equipment).every(key => !equipment[key] || room.EquipmentList.includes(key));
                return !isOccupied && hasEnoughCapacity && meetsEquipmentPreferences;
            });

            // Set rooms state
            setRooms(availableRooms);
        };
        fetchData();
    }, [startDate, endDate, capacity, equipment]);


    const handleReserve = async (room) => {
        const confirmReservation = window.confirm(`Are you sure you want to reserve Room ${room.Room}? After clicking OK, you will get the notification about the status of your reservation.`);
        if (confirmReservation) {
            const newReservation = {
                StartTime: Math.floor(new Date(startDate).getTime() / 1000),
                EndTime: Math.floor(new Date(endDate).getTime() / 1000),
                RoomId: room.Room,
                ProfessorId: 'professorId', // replace with actual professorId
                Status: 'Pending',
                SchoolId: room.SchoolId,
            };

            const response = await fetch('http://localhost:8000/reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReservation),
            });

            if (response.ok) {
                console.log(`Room ${room.Room} has been reserved.`);
                window.alert(`You have successfully reserved Room ${room.Room}.`);

                // Remove the reserved room from the list of available rooms
                setRooms(rooms.filter(r => r._id !== room._id));
            } else {
                window.alert(`Failed to reserve Room ${room.Room}.`);
            }
        }
    };


    return (
        <div>
            <Header />
            <div className="p-8 bg-white shadow-md rounded-lg max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Available Rooms</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr>
                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">No.</th>
                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Room</th>
                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Type</th>
                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">School ID</th>
                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Capacity</th>
                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Equipment List</th>
                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {rooms.map((room, index) => (
                        <tr key={room._id} className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">{index + 1}</td>
                            <td className="py-4 px-6 border-b border-grey-light">{room.Room}</td>
                            <td className="py-4 px-6 border-b border-grey-light">{room.Type}</td>
                            <td className="py-4 px-6 border-b border-grey-light">{room.SchoolId}</td>
                            <td className="py-4 px-6 border-b border-grey-light">{room.Capacity}</td>
                            <td className="py-4 px-6 border-b border-grey-light">{room.EquipmentList.join(', ')}</td>
                            <td className="py-4 px-6 border-b border-grey-light">
                                <button onClick={() => handleReserve(room)} className="text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105">
                                    Reserve
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AvailableRooms;
