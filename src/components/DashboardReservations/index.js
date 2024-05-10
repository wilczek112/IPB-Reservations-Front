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
  const [refreshData, setRefreshData] = useState(false); // Add this line

  // Fetch data from your API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/reservation/');
      const data = await response.json();
      setReservations(data);
    };
    fetchData();
  }, [refreshData]); // Add refreshData as a dependency

  const handleEdit = id => {
    const [reservation] = reservations.filter(reservation => reservation._id === id);

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

          setRefreshData(prevState => !prevState); // Add this line
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
                setRefreshData={setRefreshData} // Pass setRefreshData to Add
            />
        )}
        {isEditing && (
            <Edit
                selectedReservation={selectedReservation}
                setReservations={setReservations}
                setIsEditing={setIsEditing}
                setRefreshData={setRefreshData} // Pass setRefreshData to Edit
            />
        )}
      </div>
  );
};

export default Dashboard;
