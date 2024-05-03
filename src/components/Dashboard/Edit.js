import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ selectedReservation, setIsEditing }) => {
  const id = selectedReservation.id;

  const [dateAndTime, setDateAndTime] = useState(selectedReservation.DateAndTime);
  const [department, setDepartment] = useState(selectedReservation.Department);
  const [equipmentId, setEquipmentId] = useState(selectedReservation.Equipment_id);
  const [roomId, setRoomId] = useState(selectedReservation.Room_id);
  const [professorId, setProfessorId] = useState(selectedReservation.Professor_id);
  const [status, setStatus] = useState(selectedReservation.Status);

  const handleUpdate = async e => {
    e.preventDefault();

    if (!dateAndTime || !department || !equipmentId || !roomId || !professorId || !status) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedReservation = {
      DateAndTime: dateAndTime,
      Department: department,
      Equipment_id: equipmentId,
      Room_id: roomId,
      Professor_id: professorId,
      Status: status,
    };

    // Send a PUT request to your API
    const response = await fetch(`http://localhost:8000/reservation/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedReservation),
    });

    if (response.ok) {
      setIsEditing(false);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `Reservation has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update reservation.',
        showConfirmButton: true,
      });
    }
  };

  return (
      <div className="small-container">
        <form onSubmit={handleUpdate}>
          <h1>Edit Reservation</h1>
          <label htmlFor="dateAndTime">Date and Time</label>
          <input
              id="dateAndTime"
              type="text"
              name="dateAndTime"
              value={dateAndTime}
              onChange={e => setDateAndTime(e.target.value)}
          />
          <label htmlFor="department">Department</label>
          <input
              id="department"
              type="text"
              name="department"
              value={department}
              onChange={e => setDepartment(e.target.value)}
          />
          <label htmlFor="equipmentId">Equipment ID</label>
          <input
              id="equipmentId"
              type="text"
              name="equipmentId"
              value={equipmentId}
              onChange={e => setEquipmentId(e.target.value)}
          />
          <label htmlFor="roomId">Room ID</label>
          <input
              id="roomId"
              type="text"
              name="roomId"
              value={roomId}
              onChange={e => setRoomId(e.target.value)}
          />
          <label htmlFor="professorId">Professor ID</label>
          <input
              id="professorId"
              type="text"
              name="professorId"
              value={professorId}
              onChange={e => setProfessorId(e.target.value)}
          />
          <label htmlFor="status">Status</label>
          <input
              id="status"
              type="text"
              name="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
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
