import { useState, useEffect } from 'react';
import useAuth from './useAuth.jsx';
import { fetchArtistData } from '../api/spotify.js';

export const useArtistData = (artistId) => {
  const { accessToken, loading: authLoading, error: authError } = useAuth();
  const [artistName, setArtistName] = useState('');
  const [artistImage, setArtistImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      if (!accessToken) return;

      setLoading(true);
      setError(null);

      try {
        const artistData = await fetchArtistData(accessToken, artistId);
        setArtistName(artistData.name || '');
        setArtistImage(artistData.images[0]?.url || '');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (authError) {
      setError(authError);
    } else if (!authLoading) {
      fetchArtistDetails();
    }
  }, [accessToken, artistId, authLoading, authError]);

  return { artistName, artistImage, loading, error };
};
