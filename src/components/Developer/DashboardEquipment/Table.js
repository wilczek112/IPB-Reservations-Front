import React from 'react';

const Table = ({ equipments, handleEdit, handleDelete }) => {
  return (
      <div className="contain-table mx-auto w-full max-w-screen-lg">
        <table className="striped-table w-full">
          <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Icon ID</th>
            <th className="border px-4 py-2 text-center" colSpan={2}>
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          {equipments.length > 0 ? (
              equipments.map((equipment, index) => (
                  <tr key={equipment._id} className="border">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{equipment.name}</td>
                    <td className="border px-4 py-2">{equipment.iconId}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                          onClick={() => handleEdit(equipment._id)}
                          className="bg-loulou text-melanie hover:bg-hopbush hover:text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                          onClick={() => handleDelete(equipment._id)}
                          className="bg-loulou text-melanie hover:bg-hopbush hover:text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan={5} className="border px-4 py-2 text-center">
                  No Equipments
                </td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  );
};

export default Table;
