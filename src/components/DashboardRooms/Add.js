import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ setIsAdding, setRefreshData }) => {
  const [room, setRoom] = useState('');
  const [type, setType] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [capacity, setCapacity] = useState('');
  const [equipmentList, setEquipmentList] = useState([]);

  const handleAdd = async e => {
    e.preventDefault();

    if (!room || !type || !schoolId || !capacity || !equipmentList) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newRoom = {
      Room: room,
      Type: type,
      SchoolId: schoolId,
      Capacity: capacity,
      EquipmentList: equipmentList,
    };

    const response = await fetch('http://localhost:8000/room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRoom),
    });

    if (response.ok) {
      setIsAdding(false);
      setRefreshData(prevState => !prevState);
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `Room has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add room.',
        showConfirmButton: true,
      });
    }
  };

  return (
      <div className="small-container">
        <form onSubmit={handleAdd}>
          <h1>Add Room</h1>
          <label htmlFor="room">Room</label>
          <input
              id="room"
              type="text"
              name="room"
              value={room}
              onChange={e => setRoom(e.target.value)}
          />
          <label htmlFor="type">Type</label>
          <input
              id="type"
              type="text"
              name="type"
              value={type}
              onChange={e => setType(e.target.value)}
          />
          <label htmlFor="schoolId">School ID</label>
          <input
              id="schoolId"
              type="text"
              name="schoolId"
              value={schoolId}
              onChange={e => setSchoolId(e.target.value)}
          />
          <label htmlFor="capacity">Capacity</label>
          <input
              id="capacity"
              type="text"
              name="capacity"
              value={capacity}
              onChange={e => setCapacity(e.target.value)}
          />
          <label htmlFor="equipmentList">Equipment List</label>
          <input
              id="equipmentList"
              type="text"
              name="equipmentList"
              value={equipmentList}
              onChange={e => setEquipmentList(e.target.value.split(','))}
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
