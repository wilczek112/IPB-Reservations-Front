import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ selectedRoom, setIsEditing, setRefreshData }) => {
  const id = selectedRoom._id;

  const [room, setRoom] = useState(selectedRoom.Room);
  const [type, setType] = useState(selectedRoom.Type);
  const [schoolId, setSchoolId] = useState(selectedRoom.SchoolId);
  const [capacity, setCapacity] = useState(selectedRoom.Capacity);
  const [equipmentList, setEquipmentList] = useState(selectedRoom.EquipmentList);

  const handleUpdate = async e => {
    e.preventDefault();

    if (!room || !type || !schoolId || !capacity || !equipmentList) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedRoom = {
      Room: room,
      Type: type,
      SchoolId: schoolId,
      Capacity: capacity,
      EquipmentList: equipmentList,
    };

    const response = await fetch(`http://localhost:8000/room/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRoom),
    });

    if (response.ok) {
      setIsEditing(false);
      setRefreshData(prevState => !prevState);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `Room has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update room.',
        showConfirmButton: true,
      });
    }
  };

  return (
      <div className="small-container">
        <form onSubmit={handleUpdate}>
          <h1>Edit Room</h1>
          <label htmlFor="room">Room</label>
          <input
              id="room"
              type="text"
              name="room"
              value={room}
              onChange={e => setRoom(e.target.value)}
              style={{ color: 'black' }} // Dodane style
          />
          <label htmlFor="type">Type</label>
          <input
              id="type"
              type="text"
              name="type"
              value={type}
              onChange={e => setType(e.target.value)}
              style={{ color: 'black' }} // Dodane style
          />
          <label htmlFor="schoolId">School ID</label>
          <input
              id="schoolId"
              type="text"
              name="schoolId"
              value={schoolId}
              onChange={e => setSchoolId(e.target.value)}
              style={{ color: 'black' }} // Dodane style
          />
          <label htmlFor="capacity">Capacity</label>
          <input
              id="capacity"
              type="text"
              name="capacity"
              value={capacity}
              onChange={e => setCapacity(e.target.value)}
              style={{ color: 'black' }} // Dodane style
          />
          <label htmlFor="equipmentList">Equipment List</label>
          <input
              id="equipmentList"
              type="text"
              name="equipmentList"
              value={equipmentList}
              onChange={e => setEquipmentList(e.target.value.split(','))}
              style={{ color: 'black' }} // Dodane style
          />
          <div style={{ marginTop: '30px' }}>
            <input type="submit" value="Update" />
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