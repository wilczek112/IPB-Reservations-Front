import React from 'react';

const Table = ({ rooms, handleEdit, handleDelete }) => {
  return (
      <div className="contain-table">
        <table className="striped-table">
          <thead>
          <tr>
            <th>No.</th>
            <th>Room</th>
            <th>Type</th>
            <th>School ID</th>
            <th>Capacity</th>
            <th>Equipment List</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          {rooms.length > 0 ? (
              rooms.map((room, i) => (
                  <tr key={room._id}>
                    <td>{i + 1}</td>
                    <td>{room.Room}</td>
                    <td>{room.Type}</td>
                    <td>{room.SchoolId}</td>
                    <td>{room.Capacity}</td>
                    <td>{room.EquipmentList.join(', ')}</td>
                    <td className="text-right">
                      <button onClick={() => handleEdit(room._id)} className="button muted-button">
                        Edit
                      </button>
                    </td>
                    <td className="text-left">
                      <button onClick={() => handleDelete(room._id)} className="button muted-button">
                        Delete
                      </button>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan={7}>No Rooms</td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  );
};

export default Table;
