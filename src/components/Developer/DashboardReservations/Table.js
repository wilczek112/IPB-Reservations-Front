import React from 'react';

const Table = ({ reservations, handleEdit, handleDelete }) => {
  return (
      <div className="contain-table" style={{ overflowX: 'auto' }}>
        <table className="striped-table" style={{ width: '100%', margin: '0 auto', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <thead>
          <tr>
            <th>No.</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Room ID</th>
            <th>Professor ID</th>
            <th>Status</th>
            <th>School ID</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          {reservations.length > 0 ? (
              reservations.map((reservation, i) => (
                  <tr key={reservation._id}>
                    <td>{i + 1}</td>
                    <td>{new Date(reservation.StartTime * 1000).toLocaleString()}</td>
                    <td>{new Date(reservation.EndTime * 1000).toLocaleString()}</td>
                    <td>{reservation.RoomId}</td>
                    <td>{reservation.ProfessorId}</td>
                    <td>{reservation.Status}</td>
                    <td>{reservation.SchoolId}</td>
                    <td className="text-right">
                      <button
                          onClick={() => handleEdit(reservation._id)}
                          className="button muted-button"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-left">
                      <button
                          onClick={() => handleDelete(reservation._id)}
                          className="button muted-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan={8}>No Reservations</td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  );
};

export default Table;
