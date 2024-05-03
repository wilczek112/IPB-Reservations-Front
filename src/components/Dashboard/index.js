import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

const Dashboard = ({ setIsAuthenticated }) => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data from your API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/reservations/');
      const data = await response.json();
      // Map the data to match the reservation schema
      const mappedData = data.map(item => ({
        id: item._id,
        StartTime: item.StartTime,
        EndTime: item.EndTime,
        RoomId: item.RoomId,
        ProfessorId: item.ProfessorId,
        Status: item.Status,
        SchoolId: item.SchoolId,
      }));
      setReservations(mappedData);
    };
    fetchData();
  }, []);

  const handleEdit = id => {
    const [reservation] = reservations.filter(reservation => reservation.id === id);

    setSelectedReservation(reservation);
    setIsEditing(true);
  };

  const handleDelete = async id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async result => {
      if (result.value) {
        // Send a DELETE request to your API
        const response = await fetch(`http://localhost:8000/reservation/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `Reservation has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });

          const reservationsCopy = reservations.filter(reservation => reservation.id !== id);
          setReservations(reservationsCopy);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to delete reservation.',
            showConfirmButton: true,
          });
        }
      }
    });
  };
  return (
      <div className="container">
        {!isAdding && !isEditing && (
            <>
              <Header
                  setIsAdding={setIsAdding}
                  setIsAuthenticated={setIsAuthenticated}
              />
              <Table
                  reservations={reservations}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
              />
            </>
        )}
        {isAdding && (
            <Add
                setReservations={setReservations}
                setIsAdding={setIsAdding}
            />
        )}
        {isEditing && (
            <Edit
                selectedReservation={selectedReservation}
                setReservations={setReservations}
                setIsEditing={setIsEditing}
            />
        )}
      </div>
  );
};

export default Dashboard;
