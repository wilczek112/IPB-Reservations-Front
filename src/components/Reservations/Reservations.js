import React, { useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import Header from '../Header/Header';
import '../../index.css';
import ActiveUser from '../Authentication/ActiveUser';

function Reservations() {
    const user = ActiveUser.getUser();
    const professorId = user.professorId;
    const [currentReservations, setCurrentReservations] = useState([]);
    const [previousReservations, setPreviousReservations] = useState([]);
    const [tab, setTab] = useState('current');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(`http://localhost:8000/reservation/professor/${professorId}`);
        const data = await response.json();
        const now = Date.now() / 1000;
        setCurrentReservations(data.filter(reservation => reservation.EndTime >= now && reservation.Status !== 'Cancelled').sort((a, b) => b.StartTime - a.StartTime));
        setPreviousReservations(data.filter(reservation => reservation.EndTime < now || reservation.Status === 'Cancelled').sort((a, b) => b.StartTime - a.StartTime));
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'border-green-500';
            case 'Rejected':
                return 'border-red-500';
            case 'Pending':
                return 'border-yellow-500';
            case 'Cancelled':
                return 'border-orange-500';
            default:
                return '';
        }
    }

    const handleCancel = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, cancel!',
        }).then(async result => {
            if (result.value) {
                const reservationToCancel = currentReservations.find(reservation => reservation._id === id);
                reservationToCancel.Status = 'Cancelled';
                reservationToCancel.ProfessorId = professorId;
                const response = await fetch(`http://localhost:8000/reservation/cancel/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservationToCancel),
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cancelled!',
                        text: `Reservation has been cancelled.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    fetchData();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to cancel reservation.',
                        showConfirmButton: true,
                    });
                }
            }
        });
    };



    return (
        <div>
            <Header />
            <div className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Reservations</h2>
                <div className="flex justify-center mb-4">
                    <button onClick={() => setTab('current')} className={`px-4 py-2 rounded ${tab === 'current' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>Current ({currentReservations.length})</button>
                    <button onClick={() => setTab('previous')} className={`px-4 py-2 rounded ${tab === 'previous' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>Previous ({previousReservations.length})</button>
                </div>
                {tab === 'current' ? (
                    <div>
                        <h3 className="text-lg font-medium mb-2">Current Reservations</h3>
                        {currentReservations.map((reservation, index) => (
                            <div key={index} className={`p-4 border-2 rounded mb-4 ${getStatusColor(reservation.Status)}`}>
                                <h4 className="font-bold">Room {reservation.RoomId}</h4>
                                <p>Start Time: {formatTimestamp(reservation.StartTime)}</p>
                                <p>End Time: {formatTimestamp(reservation.EndTime)}</p>
                                <p>Status: {reservation.Status}</p>
                                <button onClick={() => handleCancel(reservation._id)} className="mt-2 px-4 py-2 rounded bg-red-500 text-white">Cancel Reservation</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <h3 className="text-lg font-medium mb-2">Previous Reservations</h3>
                        {previousReservations.map((reservation, index) => (
                            <div key={index} className={`p-4 border-2 rounded mb-4 ${getStatusColor(reservation.Status)}`}>
                                <h4 className="font-bold">Room {reservation.RoomId}</h4>
                                <p>Start Time: {formatTimestamp(reservation.StartTime)}</p>
                                <p>End Time: {formatTimestamp(reservation.EndTime)}</p>
                                <p>Status: {reservation.Status}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Reservations;
