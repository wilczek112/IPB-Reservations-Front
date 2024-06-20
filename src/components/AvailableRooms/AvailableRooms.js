import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Header from '../Header/Header';
import '../../index.css';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import ActiveUser from '../App/ActiveUser';
import { useTable, useSortBy } from 'react-table';

function AvailableRooms() {
    const location = useLocation();
    const { startDate, endDate, capacity, equipment } = location.state || {};
    const [rooms, setRooms] = useState([]);
    const [reservations, setReservations] = useState([]);

    const user = ActiveUser.getUser();
    const professorId = user.professorId;

    useEffect(() => {
        const fetchData = async () => {
            const roomResponse = await fetch('http://localhost:8000/room');
            const reservationResponse = await fetch('http://localhost:8000/reservation');
            const roomData = await roomResponse.json();
            const reservationData = await reservationResponse.json();

            const startTimestamp = new Date(startDate).getTime() / 1000;
            const endTimestamp = new Date(endDate).getTime() / 1000;

            const activeReservations = reservationData.filter(reservation =>
                (reservation.Status === 'Approved' || reservation.Status === 'Pending') &&
                !(reservation.EndTime <= startTimestamp || reservation.StartTime >= endTimestamp)
            );

            const availableRooms = roomData.filter(room => {
                const isOccupied = activeReservations.some(reservation => reservation.RoomId === room.Room);
                const hasEnoughCapacity = room.Capacity >= capacity;
                const meetsEquipmentPreferences = Object.keys(equipment).every(key => !equipment[key] || room.EquipmentList.includes(key));
                return !isOccupied && hasEnoughCapacity && meetsEquipmentPreferences;
            });

            setRooms(availableRooms);
        };
        fetchData();
    }, [startDate, endDate, capacity, equipment, reservations]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Room',
                accessor: 'Room',
            },
            {
                Header: 'Type',
                accessor: 'Type',
            },
            {
                Header: 'School ID',
                accessor: 'SchoolId',
            },
            {
                Header: 'Capacity',
                accessor: 'Capacity',
            },
            {
                Header: 'Equipment List',
                accessor: 'EquipmentList',
                Cell: ({ value }) => value.join(', '),
            },
            {
                Header: '',
                id: 'reserve',
                accessor: str => "reserve",
                Cell: (tableProps) => (
                    <button onClick={() => handleReserve(tableProps.row.original)} className="text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105">
                        Reserve
                    </button>
                )
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: rooms }, useSortBy);


    const handleReserve = async (room) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: `Are you sure you want to reserve Room ${room.Room}? After clicking OK, you will get the notification about the status of your reservation.`,
            showCancelButton: true,
            confirmButtonText: 'Yes, reserve it!',
            cancelButtonText: 'No, cancel!',
        }).then(async result => {
            if (result.value) {
                const newReservation = {
                    StartTime: Math.floor(new Date(startDate).getTime() / 1000),
                    EndTime: Math.floor(new Date(endDate).getTime() / 1000),
                    RoomId: room.Room,
                    ProfessorId: professorId,
                    Status: 'Pending',
                    SchoolId: room.SchoolId,
                };

                const response = await fetch('http://localhost:8000/reservation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newReservation),
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Reserved!',
                        text: `You have successfully reserved Room ${room.Room}.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    setRooms(rooms.filter(r => r._id !== room._id));
                    setReservations([...reservations, newReservation]);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: `Failed to reserve Room ${room.Room}.`,
                        showConfirmButton: true,
                    });
                }
            }
        });
    };



    return (
        <div>
            <Header />
            <div className="p-8 bg-white shadow-md rounded-lg max-w-full mx-auto"> {/* Change max-w-2xl to max-w-full */}
                <h2 className="text-2xl font-bold mb-4 text-center">Available Rooms</h2>
                <table {...getTableProps()} className="w-full text-left border-collapse">
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={`py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light ${column.canSort ? 'cursor-pointer' : ''}`}
                                >
                                    {column.render('Header')}
                                    <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="hover:bg-grey-lighter">
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="py-4 px-6 border-b border-grey-light"
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AvailableRooms;