import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || '/api/entries';

function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isSuccess: true });

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch entries');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      setMessage({ text: error.message, isSuccess: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const addEntry = async (entry) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
      if (!response.ok) throw new Error('Failed to add entry');
      fetchEntries();
      setMessage({ text: 'Entry added successfully!', isSuccess: true });
    } catch (error) {
      setMessage({ text: error.message, isSuccess: false });
    }
  };

  const deleteEntry = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete entry');
      fetchEntries();
      setMessage({ text: 'Entry deleted successfully!', isSuccess: true });
    } catch (error) {
      setMessage({ text: error.message, isSuccess: false });
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <EntryForm onAdd={addEntry} />
        <EntryList entries={entries} onDelete={deleteEntry} />
      </div>
      {loading && <p>Loading...</p>}
      {message.text && (
        <div className={`message ${message.isSuccess ? 'success' : 'error'}`}>
          {message.text}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;