import React, { useState } from 'react';
function EntryForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ amount, description });
    setAmount('');
    setDescription('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>Amount:</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <label>Description:</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Add Entry</button>
    </form>
  );
}
export default EntryForm;