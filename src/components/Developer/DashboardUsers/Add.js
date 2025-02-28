import React, { useState } from 'react';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';
import API_URL from "../../../api_config";

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

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      name: name,
      surname: surname,
      role: role,
      email: email,
      password: hashedPassword,
    };

    const response = await fetch(`${API_URL}/user`, {
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
          <h1 className="text-2xl font-bold mb-4">Add User</h1>
          <label htmlFor="name">Name</label>
          <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ color: 'black' }}
          />
          <label htmlFor="surname">Surname</label>
          <input
              id="surname"
              type="text"
              name="surname"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              style={{ color: 'black' }}
          />
          <label htmlFor="role">Role</label>
          <input
              id="role"
              type="text"
              name="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              style={{ color: 'black' }}
          />
          <label htmlFor="email">Email</label>
          <input
              id="email"
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ color: 'black' }}
          />
          <label htmlFor="password">Password</label>
          <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ color: 'black' }}
          />
          <div style={{ marginTop: '30px' }}>
            <input type="submit" value="Add" className="bg-loulou text-melanie hover:bg-hopbush hover:text-white font-bold py-2 px-4 rounded" />
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
