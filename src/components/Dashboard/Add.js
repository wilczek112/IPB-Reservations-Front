import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ setIsAdding }) => {
  const [dateAndTime, setDateAndTime] = useState('');
  const [department, setDepartment] = useState('');
  const [equipmentId, setEquipmentId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [professorId, setProfessorId] = useState('');
  const [status, setStatus] = useState('');

  const handleAdd = async e => {
    e.preventDefault();

    if (!dateAndTime || !department || !equipmentId || !roomId || !professorId || !status) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newReservation = {
      DateAndTime: dateAndTime,
      Department: department,
      Equipment_id: equipmentId,
      Room_id: roomId,
      Professor_id: professorId,
      Status: status,
    };

    // Send a POST request to your API
    const response = await fetch('http://localhost:8000/reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReservation),
    });

    if (response.ok) {
      setIsAdding(false);
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
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
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
