import { useState, useEffect } from 'react';
import useAuth from './useAuth.jsx';
import { fetchArtistData, fetchArtistTracksData } from '../api/spotify.js';

export const useArtistData = (artistId) => {
  const { accessToken, loading: authLoading, error: authError } = useAuth();
  const [artistName, setArtistName] = useState('');
  const [artistImage, setArtistImage] = useState('');
  const [artistFollowers, setArtistFollowers] = useState('0');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      if (!accessToken) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch artist data
        const artistData = await fetchArtistData(accessToken, artistId);
        setArtistName(artistData.name || '');
        setArtistImage(artistData.images[0]?.url || '');
        setArtistFollowers(artistData.followers?.total || '0');

        // Fetch artist's top tracks
        const tracksData = await fetchArtistTracksData(accessToken, artistId);
        setTracks(tracksData || []);
      } catch (error) {
        setError(`Failed to fetch artist data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (authError) {
      setError(`Authentication error: ${authError}`);
    } else if (!authLoading) {
      fetchArtistDetails();
    }
  }, [accessToken, artistId, authLoading, authError]);

  return { artistName, artistImage, artistFollowers, tracks, loading, error };
};
