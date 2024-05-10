import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ selectedReservation, setIsEditing, setRefreshData }) => { // Add setRefreshData as a prop
  console.log(selectedReservation); // Add this line
  const id = selectedReservation._id;

  const [startTime, setStartTime] = useState(selectedReservation.StartTime);
  const [endTime, setEndTime] = useState(selectedReservation.EndTime);
  const [roomId, setRoomId] = useState(selectedReservation.RoomId);
  const [professorId, setProfessorId] = useState(selectedReservation.ProfessorId);
  const [status, setStatus] = useState(selectedReservation.Status);
  const [schoolId, setSchoolId] = useState(selectedReservation.SchoolId);

  const handleUpdate = async e => {
    e.preventDefault();

    if (!startTime || !endTime || !roomId || !professorId || !status || !schoolId) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedReservation = {
      StartTime: startTime,
      EndTime: endTime,
      RoomId: roomId,
      ProfessorId: professorId,
      Status: status,
      SchoolId: schoolId,
    };

    // Send a PUT request to your API
    const response = await fetch(`http://localhost:8000/reservation/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedReservation),
    });

    if (response.ok) {
      setIsEditing(false);
      setRefreshData(prevState => !prevState); // Add this line
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
          <label htmlFor="startTime">Start Time</label>
          <input
              id="startTime"
              type="number"
              name="startTime"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
          />
          <label htmlFor="endTime">End Time</label>
          <input
              id="endTime"
              type="number"
              name="endTime"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
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
          <label htmlFor="schoolId">School ID</label>
          <input
              id="schoolId"
              type="text"
              name="schoolId"
              value={schoolId}
              onChange={e => setSchoolId(e.target.value)}
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
