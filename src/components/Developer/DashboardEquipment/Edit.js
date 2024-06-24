import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ selectedEquipment, setIsEditing, setRefreshData }) => {
  const id = selectedEquipment._id;

  const [name, setName] = useState(selectedEquipment.name);
  const [iconId, setIconId] = useState(selectedEquipment.iconId);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !iconId) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedEquipment = {
      name: name,
      iconId: iconId,
    };

    const response = await fetch(`http://localhost:8000/equipment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEquipment),
    });

    if (response.ok) {
      setIsEditing(false);
      setRefreshData((prevState) => !prevState);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `Equipment has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update equipment.',
        showConfirmButton: true,
      });
    }
  };

  return (
      <div className="small-container">
        <form onSubmit={handleUpdate}>
          <h1>Edit Equipment</h1>
          <label htmlFor="name">Name</label>
          <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ color: 'black' }}
          />
          <label htmlFor="iconId">Icon ID</label>
          <input
              id="iconId"
              type="text"
              name="iconId"
              value={iconId}
              onChange={(e) => setIconId(e.target.value)}
              style={{ color: 'black' }}
          />
          <div style={{ marginTop: '30px' }}>
            <input
                type="submit"
                value="Update"
                className="bg-loulou text-melanie hover:bg-hopbush hover:text-white font-bold py-2 px-4 rounded"
            />
            <input
                style={{ marginLeft: '12px' }}
                className="muted-button"
                type="button"
                value="Cancel"
                onClick={() => setIsEditing(false)}
            />
          </div>
        </form>
      </div>
  );
};

export default Edit;
