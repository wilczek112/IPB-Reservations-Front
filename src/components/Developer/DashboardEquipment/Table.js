import React from 'react';

const Table = ({ equipments, handleEdit, handleDelete }) => {
  return (
      <div className="contain-table">
        <table className="striped-table">
          <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Icon ID</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          {equipments.length > 0 ? (
              equipments.map((equipment, i) => (
                  <tr key={equipment._id}>
                    <td>{i + 1}</td>
                    <td>{equipment.name}</td>
                    <td>{equipment.iconId}</td>
                    <td className="text-right">
                      <button
                          onClick={() => handleEdit(equipment._id)}
                          className="button muted-button"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-left">
                      <button
                          onClick={() => handleDelete(equipment._id)}
                          className="button muted-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan={4}>No Equipments</td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  );
};

export default Table;
