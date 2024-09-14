import { useState, useEffect } from 'react';
import useAuth from './useAuth.jsx';
import { fetchAlbumData, fetchAlbumTracksData } from '../api/spotify.js';
import { formatDuration } from '../utils/formatDuration.js';

export const useAlbumData = (albumId) => {
  const { accessToken, loading: authLoading, error: authError } = useAuth();
  const [albumName, setAlbumName] = useState('');
  const [albumImage, setAlbumImage] = useState('');
  const [albumArtist, setAlbumArtist] = useState('');
  const [albumArtistID, setAlbumArtistID] = useState('');
  const [albumYear, setAlbumYear] = useState(0);
  const [albumTotal, setAlbumTotal] = useState(0);
  const [albumTotalDuration, setAlbumTotalDuration] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      if (!accessToken) return;
      
      setLoading(true);
      setError(null);

      try {
        const albumData = await fetchAlbumData(accessToken, albumId);
        const { items: tracksData, totalDurationMs } = await fetchAlbumTracksData(accessToken, albumId);

        setAlbumName(albumData.name || '');
        setAlbumImage(albumData.images[0]?.url || '');
        setAlbumArtist(albumData.artists[0]?.name || '');
        setAlbumArtistID(albumData.artists[0]?.id || '');
        setAlbumYear(albumData.release_date.split('-')[0] || 0);
        setAlbumTotal(albumData.tracks.total || 0);
        setTracks(tracksData || []);
        setAlbumTotalDuration(totalDurationMs || 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (authError) {
      setError(authError);
    } else if (!authLoading) {
      fetchAlbumDetails();
    }
  }, [accessToken, albumId, authLoading, authError]);

  return { 
    albumName, 
    albumImage, 
    albumArtist,
    albumArtistID,
    albumYear,
    albumTotal, 
    albumTotalDuration: formatDuration(albumTotalDuration),
    tracks,
    loading, 
    error 
  };
};
