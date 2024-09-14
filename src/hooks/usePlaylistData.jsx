import { useState, useEffect } from 'react';
import useAuth from './useAuth.jsx';
import { fetchPlaylistData, fetchPlaylistTracksData } from '../api/spotify.js';
import { formatDuration } from '../utils/formatDuration.js';

export const usePlaylistData = (playlistId) => {
  const { accessToken, loading: authLoading, error: authError } = useAuth();
  const [playlistName, setPlaylistName] = useState('');
  const [playlistImage, setPlaylistImage] = useState('');
  const [playlistDesc, setPlaylistDesc] = useState('');
  const [playlistOwner, setPlaylistOwner] = useState('');
  const [playlistOwnerID, setPlaylistOwnerID] = useState('');
  const [playlistFollower, setPlaylistFollower] = useState(0);
  const [playlistTotal, setPlaylistTotal] = useState(0);
  const [playlistTotalDuration, setPlaylistTotalDuration] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      if (!accessToken) return;

      setLoading(true);
      setError(null);

      try {
        const playlistData = await fetchPlaylistData(accessToken, playlistId);
        const { items: tracksData, totalDurationMs } = await fetchPlaylistTracksData(accessToken, playlistId);

        setPlaylistName(playlistData.name || '');
        setPlaylistImage(playlistData.images[0]?.url || '');
        setPlaylistDesc(playlistData.description || '');
        setPlaylistOwner(playlistData.owner.display_name || '');
        setPlaylistOwnerID(playlistData.owner.id || '');
        setPlaylistFollower(playlistData.followers.total || 0);
        setPlaylistTotal(playlistData.tracks.total || 0);
        setTracks(tracksData || []);
        setPlaylistTotalDuration(totalDurationMs || 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (authError) {
      setError(authError);
    } else if (!authLoading) {
      fetchPlaylistDetails();
    }
  }, [accessToken, playlistId, authLoading, authError]);

  return { 
    playlistName, 
    playlistImage, 
    playlistDesc, 
    playlistFollower, 
    playlistTotal, 
    playlistOwner,
    playlistOwnerID, 
    playlistTotalDuration: formatDuration(playlistTotalDuration),
    tracks,
    loading, 
    error 
  };
};
