import React, {useState, useEffect, useCallback} from 'react';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import Header from '../Header/Header';
import '../../index.css';
import ActiveUser from '../Authentication/ActiveUser';

function Reservations() {
    const user = ActiveUser.getUser();
    const professorId = user.professorId;
    const [pendingReservations, setPendingReservations] = useState([]);
    const [approvedReservations, setApprovedReservations] = useState([]);
    const [cancelledReservations, setCancelledReservations] = useState([]);
    const [tab, setTab] = useState('pending');

    const fetchData = useCallback(async () => {
        const response = await fetch(`http://localhost:8000/reservation/professor/${professorId}`);
        const data = await response.json();
        const now = Date.now() / 1000;
        setPendingReservations(data.filter(reservation => reservation.Status === 'Pending').sort((a, b) => b.StartTime - a.StartTime));
        setApprovedReservations(data.filter(reservation => reservation.Status === 'Approved').sort((a, b) => b.StartTime - a.StartTime));
        setCancelledReservations(data.filter(reservation => reservation.Status === 'Cancelled').sort((a, b) => b.StartTime - a.StartTime));
    }, [professorId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


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
                const reservationToCancel = pendingReservations.find(reservation => reservation._id === id);
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
            <div className="p-8 bg-bouquet shadow-md rounded-lg max-w-screen-sm mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center text-white">Reservations</h2>
                <div className="flex justify-center mb-4 space-x-4">
                    <button onClick={() => setTab('pending')}
                            className={`px-4 py-2 rounded ${tab === 'pending' ? 'bg-loulou text-white' : 'bg-white text-loulou'}`}>Pending
                        ({pendingReservations.length})
                    </button>
                    <button onClick={() => setTab('approved')}
                            className={`px-4 py-2 rounded ${tab === 'approved' ? 'bg-loulou text-white' : 'bg-white text-loulou'}`}>Approved
                        ({approvedReservations.length})
                    </button>
                    <button onClick={() => setTab('cancelled')}
                            className={`px-4 py-2 rounded ${tab === 'cancelled' ? 'bg-loulou text-white' : 'bg-white text-loulou'}`}>Cancelled
                        ({cancelledReservations.length})
                    </button>
                </div>
                {tab === 'pending' ? (
                    <div>
                        <h3 className="text-lg font-medium mb-2 text-white">Current Reservations</h3>
                        {pendingReservations.map((reservation, index) => (
                            <div key={index}
                                 className={`p-4 border-2 border-solid rounded-lg font-semibold mb-4 ${getStatusColor(reservation.Status)}`}>
                                <h4 className="font-bold">Room {reservation.RoomId}</h4>
                                <p>Start Time: {formatTimestamp(reservation.StartTime)}</p>
                                <p>End Time: {formatTimestamp(reservation.EndTime)}</p>
                                <p>Status: {reservation.Status}</p>
                                <button onClick={() => handleCancel(reservation._id)}
                                        className="mt-2 px-4 py-2 rounded bg-red-500 text-white">Cancel Reservation
                                </button>
                            </div>
                        ))}
                    </div>                ) : tab === 'approved' ? (
                    <div>
                        <h3 className="text-lg font-medium mb-2 text-white">Current Reservations</h3>
                        {approvedReservations.map((reservation, index) => (
                            <div key={index}
                                 className={`p-4 border-2 border-solid rounded-lg font-semibold mb-4 ${getStatusColor(reservation.Status)}`}>
                                <h4 className="font-bold">Room {reservation.RoomId}</h4>
                                <p>Start Time: {formatTimestamp(reservation.StartTime)}</p>
                                <p>End Time: {formatTimestamp(reservation.EndTime)}</p>
                                <p>Status: {reservation.Status}</p>

                            </div>
                        ))}
                    </div>                    ) : (
                    <div>
                        <h3 className="text-lg font-medium mb-2 text-white">Current Reservations</h3>
                        {cancelledReservations.map((reservation, index) => (
                            <div key={index}
                                 className={`p-4 border-2 border-solid rounded-lg font-semibold mb-4 ${getStatusColor(reservation.Status)}`}>
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
