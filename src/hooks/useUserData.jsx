import { useState, useEffect } from 'react';
import useAuth from './useAuth.jsx';
import { fetchUserData } from '../api/spotify.js';

export const useUserData = (userId) => {
  const { accessToken, loading: authLoading, error: authError } = useAuth();
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!accessToken) return;

      setLoading(true);
      setError(null);

      try {
        const userData = await fetchUserData(accessToken, userId);
        setUserName(userData.display_name || '');
        setUserImage(userData.images[0]?.url || '');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (authError) {
      setError(authError);
    } else if (!authLoading) {
      fetchUserDetails();
    }
  }, [accessToken, userId, authLoading, authError]);

  return { 
    userName, 
    userImage, 
    loading, 
    error 
  };
};
