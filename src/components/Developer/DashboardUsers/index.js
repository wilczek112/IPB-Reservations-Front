import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../../../index.css';
import { Link } from 'react-router-dom';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import API_URL from "../../../api_config";

const Dashboard = ({ setIsAuthenticated }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/user`);
      const data = await response.json();
      setUsers(data);
    };
    fetchData();
  }, [refreshData]);

  const handleEdit = id => {
    const [user] = users.filter(user => user._id === id);
    setSelectedUser(user);
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
        const response = await fetch(`${API_URL}/user/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `User has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });

          setRefreshData(prevState => !prevState);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to delete user.',
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
              <Header
                  setIsAdding={setIsAdding}
                  setIsAuthenticated={setIsAuthenticated}
              />
              <Table
                  users={users}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
              />
            </>
        )}
        {isAdding && (
            <Add
                setUsers={setUsers}
                setIsAdding={setIsAdding}
                setRefreshData={setRefreshData}
            />
        )}
        {isEditing && (
            <Edit
                selectedUser={selectedUser}
                setUsers={setUsers}
                setIsEditing={setIsEditing}
                setRefreshData={setRefreshData}
            />
        )}
      </div>
  );
};

export default Dashboard;
