import React, { useState } from 'react';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';

const Edit = ({ selectedUser, setIsEditing, setRefreshData }) => {
  const id = selectedUser._id;

  const [name, setName] = useState(selectedUser.name);
  const [surname, setSurname] = useState(selectedUser.surname);
  const [role, setRole] = useState(selectedUser.role);
  const [email, setEmail] = useState(selectedUser.email);
  const [password, setPassword] = useState(selectedUser.password);


  const handleUpdate = async e => {
    e.preventDefault();

    if (!name || !surname || !role || !email || !password) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const updatedUser = {
      name: name,
      surname: surname,
      role: role,
      email: email,
      password: hashedPassword,  // Store the hashed password
    };

    const response = await fetch(`http://localhost:8000/user/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      setIsEditing(false);
      setRefreshData(prevState => !prevState);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `User has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update user.',
        showConfirmButton: true,
      });
    }
  };


  return (
      <div className="small-container">
        <form onSubmit={handleUpdate}>
          <h1>Edit User</h1>
          <label htmlFor="name">Name</label>
          <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ color: 'black' }} // Dodane style
          />
          <label htmlFor="surname">Surname</label>
          <input
              id="surname"
              type="text"
              name="surname"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              style={{ color: 'black' }} // Dodane style
          />
          <label htmlFor="role">Role</label>
          <input
              id="role"
              type="text"
              name="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              style={{ color: 'black' }} // Dodane style
          />
          <label htmlFor="email">Email</label>
          <input
              id="email"
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ color: 'black' }} // Dodane style
          />
          <label htmlFor="password">Password</label>
          <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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