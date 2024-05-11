import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ setIsAdding, setRefreshData }) => {
  const [name, setName] = useState('');
  const [iconId, setIconId] = useState('');

  const handleAdd = async e => {
    e.preventDefault();

    if (!name || !iconId) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newEquipment = {
      name: name,
      iconId: iconId,
    };

    const response = await fetch('http://localhost:8000/equipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEquipment),
    });

    if (response.ok) {
      setIsAdding(false);
      setRefreshData(prevState => !prevState);
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `Equipment has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add equipment.',
        showConfirmButton: true,
      });
    }
  };

  return (
      <div className="small-container">
        <form onSubmit={handleAdd}>
          <h1>Add Equipment</h1>
          <label htmlFor="name">Name</label>
          <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
          />
          <label htmlFor="iconId">Icon ID</label>
          <input
              id="iconId"
              type="text"
              name="iconId"
              value={iconId}
              onChange={e => setIconId(e.target.value)}
          />
          <div style={{ marginTop: '30px' }}>
            <input type="submit" value="Add" />
            <input
                style={{ marginLeft: '12px' }}
                className="muted-button"
                type="button"
                value="Cancel"
                onClick={() => setIsAdding(false)}
            />
          </div>
        </form>
      </div>
  );
};

export default Add;
