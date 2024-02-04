import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const UserDataDisplay: React.FC = () => {
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api');
        const { name, email } = response.data.results[0];
        const fullName = `${name.first} ${name.last}`;
        setUserData({ name: fullName, email });
        localStorage.setItem('userData', JSON.stringify({ name: fullName, email }));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://randomuser.me/api');
      const { name, email } = response.data.results[0];
      const fullName = `${name.first} ${name.last}`;
      setUserData({ name: fullName, email });
      localStorage.setItem('userData', JSON.stringify({ name: fullName, email }));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="parent-container">
      <div className="container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="userData">
            <p>Name: {userData?.name}</p>
            <p>Email: {userData?.email}</p>
          </div>
        )}
        <button className="button" onClick={refreshUserData} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    </div>
  );
};

export default UserDataDisplay;
