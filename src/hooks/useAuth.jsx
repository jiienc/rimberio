import { useState, useEffect } from 'react';
import { getAccessToken } from '../api/auth.js';

const useAuth = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccessToken = async () => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      setAccessToken(token);
      localStorage.setItem('accessToken', token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      fetchAccessToken();
    }
  }, [accessToken]);

  return { accessToken, loading, error, fetchAccessToken };
};

export default useAuth;
