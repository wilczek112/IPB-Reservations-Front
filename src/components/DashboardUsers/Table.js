import React from 'react';

const Table = ({ users, handleEdit, handleDelete }) => {
  return (
      <div className="contain-table">
        <table className="striped-table">
          <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Role</th>
            <th>Email</th>
            <th>Password</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          {users.length > 0 ? (
              users.map((user, i) => (
                  <tr key={user._id}>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td className="text-right">
                      <button
                          onClick={() => handleEdit(user._id)}
                          className="button muted-button"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-left">
                      <button
                          onClick={() => handleDelete(user._id)}
                          className="button muted-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan={8}>No Users</td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  );
};

export default Table;
