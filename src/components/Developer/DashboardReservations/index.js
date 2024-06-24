import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import '../../../index.css';
import { Link } from 'react-router-dom';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

const Dashboard = ({ setIsAuthenticated }) => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/reservation/');
      const data = await response.json();
      setReservations(data);
    };
    fetchData();
  }, [refreshData]);

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

          setRefreshData(prevState => !prevState);
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
      <div className="container mx-auto px-4 bg-gray-200 text-black">
        <Link to="/developer" className="bg-loulou text-melanie hover:bg-hopbush hover:text-white font-bold py-2 px-4 rounded mb-4 inline-block">
          Back to developer panel
        </Link>
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
                setRefreshData={setRefreshData}
            />
        )}
        {isEditing && (
            <Edit
                selectedReservation={selectedReservation}
                setReservations={setReservations}
                setIsEditing={setIsEditing}
                setRefreshData={setRefreshData}
            />
        )}
      </div>
  );
};

export default Dashboard;
