import React, { useState } from 'react';
import Swal from 'sweetalert2';
import API_URL from "../../../api_config";

const Edit = ({ selectedRoom, setIsEditing, setRefreshData }) => {
  const id = selectedRoom._id;

  const [room, setRoom] = useState(selectedRoom.Room);
  const [type, setType] = useState(selectedRoom.Type);
  const [schoolId, setSchoolId] = useState(selectedRoom.SchoolId);
  const [capacity, setCapacity] = useState(selectedRoom.Capacity);
  const [equipmentList, setEquipmentList] = useState(selectedRoom.EquipmentList.join(','));

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!room || !type || !schoolId || !capacity || !equipmentList.length) {
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
      EquipmentList: equipmentList.split(','),
    };

    const response = await fetch(`${API_URL}/room/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRoom),
    });

    if (response.ok) {
      setIsEditing(false);
      setRefreshData((prevState) => !prevState);
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
              onChange={(e) => setRoom(e.target.value)}
              className="input-field"
          />
          <label htmlFor="type">Type</label>
          <input
              id="type"
              type="text"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input-field"
          />
          <label htmlFor="schoolId">School ID</label>
          <input
              id="schoolId"
              type="text"
              name="schoolId"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="input-field"
          />
          <label htmlFor="capacity">Capacity</label>
          <input
              id="capacity"
              type="text"
              name="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="input-field"
          />
          <label htmlFor="equipmentList">Equipment List (comma-separated)</label>
          <input
              id="equipmentList"
              type="text"
              name="equipmentList"
              value={equipmentList}
              onChange={(e) => setEquipmentList(e.target.value)}
              className="input-field"
          />
          <div style={{ marginTop: '30px' }}>
            <input type="submit" value="Update" className="btn-primary" />
            <input
                style={{ marginLeft: '12px' }}
                type="button"
                value="Cancel"
                onClick={() => setIsEditing(false)}
                className="btn-secondary"
            />
          </div>
        </form>
      </div>
  );
};

export default Edit;
