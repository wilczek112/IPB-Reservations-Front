import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import API_URL from "../../../api_config";

const Dashboard = ({ setIsAuthenticated }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/room`);
        if (response.ok) {
          const data = await response.json();
          setRooms(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch rooms data.',
          showConfirmButton: true,
        });
      }
    };
    fetchData();
  }, [refreshData]);

  const handleEdit = (id) => {
    const roomToEdit = rooms.find((room) => room._id === id);
    setSelectedRoom(roomToEdit);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_URL}/room/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Room has been deleted.',
              showConfirmButton: false,
              timer: 1500,
            });
            setRefreshData((prevState) => !prevState);
          } else {
            throw new Error('Failed to delete room');
          }
        } catch (error) {
          console.error('Error deleting room:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to delete room.',
            showConfirmButton: true,
          });
        }
      }
    });
  };

  return (
      <div className="container mx-auto px-4 bg-gray-200 text-black">
        <Link to="/developer"
              className="bg-loulou text-melanie hover:bg-hopbush hover:text-white font-bold py-2 px-4 rounded mb-4 inline-block">
          Back to developer panel
        </Link>
        {!isAdding && !isEditing && (
            <>
              <Header setIsAdding={setIsAdding} setIsAuthenticated={setIsAuthenticated}/>
              <Table rooms={rooms} handleEdit={handleEdit} handleDelete={handleDelete}/>
            </>
        )}
        {isAdding && <Add setIsAdding={setIsAdding} setRefreshData={setRefreshData}/>}
        {isEditing && (
            <Edit
                selectedRoom={selectedRoom}
                setIsEditing={setIsEditing}
                setRefreshData={setRefreshData}
            />
        )}
      </div>
  );
};

export default Dashboard;
