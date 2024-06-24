import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import '../../../index.css';

const Add = ({ setIsAdding, setRefreshData }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [roomId, setRoomId] = useState('');
  const [professorId, setProfessorId] = useState('');
  const [status, setStatus] = useState('');
  const [schoolId, setSchoolId] = useState('');

  const handleAdd = async e => {
    e.preventDefault();

    if (!startTime || !endTime || !roomId || !professorId || !status || !schoolId) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newReservation = {
      StartTime: startTime,
      EndTime: endTime,
      RoomId: roomId,
      ProfessorId: professorId,
      Status: status,
      SchoolId: schoolId,
    };

    const response = await fetch('http://localhost:8000/reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReservation),
    });

    if (response.ok) {
      setIsAdding(false);
      setRefreshData(prevState => !prevState);
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `Reservation has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add reservation.',
        showConfirmButton: true,
      });
    }
  };

  return (
      <div className="small-container">
        <form onSubmit={handleAdd}>
          <h1 className="text-loulou">Add Reservation</h1>
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
            <input type="submit" value="Add" className="bg-loulou text-melanie hover:bg-hopbush hover:text-white py-2 px-4 rounded-full" />
            <input
                type="button"
                value="Cancel"
                onClick={() => setIsAdding(false)}
                className="bg-gray-400 text-white ml-4 py-2 px-4 rounded-full"
            />
          </div>
        </form>
      </div>
  );
};

export default Add;
