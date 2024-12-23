import React from 'react';
function EntryList({ entries, onDelete }) {
  return (
    <div className="entries-container">
      <h2>Entries</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.amount}</td>
              <td>{entry.description}</td>
              <td>
                <button onClick={() => onDelete(entry.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default EntryList;