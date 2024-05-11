import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ setIsAdding, setRefreshData }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdd = async e => {
    e.preventDefault();

    if (!name || !surname || !role || !email || !password) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newUser = {
      name: name,
      surname: surname,
      role: role,
      email: email,
      password: password,
    };

    const response = await fetch('http://localhost:8000/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      setIsAdding(false);
      setRefreshData(prevState => !prevState);
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `User has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add user.',
        showConfirmButton: true,
      });
    }
  };

  return (
      <div className="small-container">
        <form onSubmit={handleAdd}>
          <h1>Add User</h1>
          <label htmlFor="name">Name</label>
          <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
          />
          <label htmlFor="surname">Surname</label>
          <input
              id="surname"
              type="text"
              name="surname"
              value={surname}
              onChange={e => setSurname(e.target.value)}
          />
          <label htmlFor="role">Role</label>
          <input
              id="role"
              type="text"
              name="role"
              value={role}
              onChange={e => setRole(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
              id="email"
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
