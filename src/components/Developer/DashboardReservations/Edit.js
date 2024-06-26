import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import '../../../index.css';
import API_URL from "../../../api_config";

const Edit = ({ selectedReservation, setIsEditing, setRefreshData }) => {
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

    const response = await fetch(`${API_URL}/reservation/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedReservation),
    });

    if (response.ok) {
      setIsEditing(false);
      setRefreshData(prevState => !prevState);
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
          <h1 className="text-loulou">Edit Reservation</h1>
          <label htmlFor="startTime" className="text-tapestry">Start Time</label>
          <input
              id="startTime"
              type="time"
              name="startTime"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="text-black"
          />
          <label htmlFor="endTime" className="text-tapestry">End Time</label>
          <input
              id="endTime"
              type="time"
              name="endTime"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className="text-black"
          />
          <label htmlFor="roomId" className="text-tapestry">Room ID</label>
          <input
              id="roomId"
              type="text"
              name="roomId"
              value={roomId}
              onChange={e => setRoomId(e.target.value)}
              className="text-black"
          />
          <label htmlFor="professorId" className="text-tapestry">Professor ID</label>
          <input
              id="professorId"
              type="text"
              name="professorId"
              value={professorId}
              onChange={e => setProfessorId(e.target.value)}
              className="text-black"
          />
          <label htmlFor="status" className="text-tapestry">Status</label>
          <input
              id="status"
              type="text"
              name="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="text-black"
          />
          <label htmlFor="schoolId" className="text-tapestry">School ID</label>
          <input
              id="schoolId"
              type="text"
              name="schoolId"
              value={schoolId}
              onChange={e => setSchoolId(e.target.value)}
              className="text-black"
          />
          <div className="mt-6">
            <input type="submit" value="Update" className="bg-loulou text-melanie hover:bg-hopbush hover:text-white py-2 px-4 rounded-full" />
            <input
                type="button"
                value="Cancel"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white ml-4 py-2 px-4 rounded-full"
            />
          </div>
        </form>
      </div>
  );
};

export default Edit;
