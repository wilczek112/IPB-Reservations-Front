import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import Header from '../Header/Header';
import '../../index.css';
import ActiveUser from '../Authentication/ActiveUser';

function AdminReservations() {
    const user = ActiveUser.getUser();
    const professorId = user.professorId;
    const [pendingReservations, setPendingReservations] = useState([]);
    const [doneReservations, setDoneReservations] = useState([]);
    const [tab, setTab] = useState('pending');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(`http://localhost:8000/reservation`);
        const data = await response.json();
        setPendingReservations(data.filter(reservation => reservation.Status === 'Pending').sort((a, b) => b.StartTime - a.StartTime));
        setDoneReservations(data.filter(reservation => reservation.Status !== 'Pending').sort((a, b) => b.StartTime - a.StartTime));
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

    const handleAction = async (id, action) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: `You are about to ${action} this reservation.`,
            showCancelButton: true,
            confirmButtonText: `Yes, ${action} it!`,
            cancelButtonText: 'No, cancel!',
        }).then(async result => {
            if (result.value) {
                const reservationToUpdate = (tab === 'pending' ? pendingReservations : doneReservations).find(reservation => reservation._id === id);
                reservationToUpdate.Status = action;
                reservationToUpdate.ProfessorId = professorId;
                const response = await fetch(`http://localhost:8000/reservation/${action.toLowerCase()}/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservationToUpdate),
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: `${action.charAt(0).toUpperCase() + action.slice(1)}d!`,
                        text: `Reservation has been ${action.toLowerCase()}.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    fetchData();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: `Failed to ${action.toLowerCase()} reservation.`,
                        showConfirmButton: true,
                    });
                }
            }
        });
    };

    return (
        <div>
            <Header />
            <div className="p-8 bg-bouquet shadow-md rounded-lg max-w-screen-sm mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center text-white">Admin Reservations</h2>
                <div className="flex justify-center mb-4">
                    <button onClick={() => setTab('pending')} className={`px-4 py-2 rounded ${tab === 'pending' ? 'bg-loulou text-white' : 'bg-white text-loulou border-loulou'}`}>Pending ({pendingReservations.length})</button>
                    <button onClick={() => setTab('done')} className={`px-4 py-2 rounded ${tab === 'done' ? 'bg-loulou text-white' : 'bg-white text-loulou border-loulou'}`}>Done ({doneReservations.length})</button>
                </div>
                {tab === 'pending' ? (
                    <div>
                        <h3 className="text-lg font-medium mb-2 text-white">Pending Reservations</h3>
                        {pendingReservations.map((reservation, index) => (
                            <div key={index} className={`p-4 border-2 rounded mb-4 ${getStatusColor(reservation.Status)}`}>
                                <h4 className="font-bold">Room {reservation.RoomId}</h4>
                                <p>Start Time: {formatTimestamp(reservation.StartTime)}</p>
                                <p>End Time: {formatTimestamp(reservation.EndTime)}</p>
                                <p>Status: {reservation.Status}</p>
                                <p>Professor ID: {reservation.ProfessorId}</p> {/* Add this line */}
                                <div className="flex justify-between">
                                    <button onClick={() => handleAction(reservation._id, 'approve')} className="mt-2 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700">Approve Reservation</button>
                                    <button onClick={() => handleAction(reservation._id, 'cancel')} className="mt-2 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700">Cancel Reservation</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <h3 className="text-lg font-medium mb-2 text-white">Done Reservations</h3>
                        {doneReservations.map((reservation, index) => (
                            <div key={index} className={`p-4 border-2 rounded mb-4 ${getStatusColor(reservation.Status)}`}>
                                <h4 className="font-bold">Room {reservation.RoomId}</h4>
                                <p>Start Time: {formatTimestamp(reservation.StartTime)}</p>
                                <p>End Time: {formatTimestamp(reservation.EndTime)}</p>
                                <p>Status: {reservation.Status}</p>
                                <div className="flex justify-between">
                                    <button onClick={() => handleAction(reservation._id, 'pending')} className="mt-2 px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-700">Set to Pending</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminReservations;
