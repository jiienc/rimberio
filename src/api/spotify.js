import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';

// Function to fetch playlist data
export const fetchPlaylistData = async (accessToken, playlistId) => {
  try {
    const response = await axios.get(`${BASE_URL}/playlists/${playlistId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to fetch tracks in a playlist
export const fetchPlaylistTracksData = async (accessToken, playlistId) => {
  try {
    const response = await axios.get(`${BASE_URL}/playlists/${playlistId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const totalDurationMs = response.data.items.reduce((total, item) => total + item.track.duration_ms, 0);
    return { items: response.data.items, totalDurationMs };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to fetch album data
export const fetchAlbumData = async (accessToken, albumId) => {
  try {
    const response = await axios.get(`${BASE_URL}/albums/${albumId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to fetch tracks in an album
export const fetchAlbumTracksData = async (accessToken, albumId) => {
  try {
    const response = await axios.get(`${BASE_URL}/albums/${albumId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const totalDurationMs = response.data.items.reduce((total, item) => total + item.duration_ms, 0);
    return { items: response.data.items, totalDurationMs };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to fetch artist data
export const fetchArtistData = async (accessToken, artistId) => {
  const url = `https://api.spotify.com/v1/artists/${artistId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error.message || 'Failed to fetch artist data');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to fetch user data
export const fetchUserData = async (accessToken, userId) => {
  const url = `https://api.spotify.com/v1/users/${userId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};