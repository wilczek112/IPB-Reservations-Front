import React, {useState, useEffect, useCallback} from 'react';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import Header from '../Header/Header';
import '../../index.css';
import ActiveUser from '../Authentication/ActiveUser';
import { useLocation } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
import API_URL from "../../api_config";

function AvailableRooms() {
    const location = useLocation();
    const { startDate, endDate, capacity, equipment } = location.state || {};
    const [rooms, setRooms] = useState([]);
    const user = ActiveUser.getUser();
    const professorId = user.professorId;
    const [equipmentNames, setEquipmentNames] = useState({});

    useEffect(() => {
        const fetchEquipment = async () => {
            const response = await fetch(`${API_URL}/equipment/`);
            const data = await response.json();
            const names = data.reduce((acc, equipment) => {
                acc[equipment._id] = equipment.name;
                return acc;
            }, {});
            setEquipmentNames(names);
        };

        fetchEquipment();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const roomResponse = await fetch(`${API_URL}/room`);
            const reservationResponse = await fetch(`${API_URL}/reservation`);
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
    }, [startDate, endDate, capacity, equipment]);

    const handleReserve = useCallback(async (room) => {
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

                const response = await fetch(`${API_URL}/reservation`, {
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
    }, [startDate, endDate, professorId, rooms]);

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
                Cell: ({ value }) => value.map(id => equipmentNames[id]).join(', '),
            },
            {
                Header: '',
                id: 'reserve',
                accessor: str => "reserve",
                Cell: (tableProps) => (
                    <button onClick={() => handleReserve(tableProps.row.original)} className="bg-loulou text-melanie hover:bg-hopbush hover:text-white font-bold py-2 px-4 rounded">
                        Reserve
                    </button>
                )
            },
        ],
        [equipmentNames, handleReserve]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: rooms }, useSortBy);

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 bg-gray-200 text-black max-w-screen-lg">
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
