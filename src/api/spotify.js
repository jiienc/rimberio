import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';

// Helper function to set headers
const getAuthHeaders = (accessToken) => ({
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
});

// Function to fetch playlist data
export const fetchPlaylistData = async (accessToken, playlistId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/playlists/${playlistId}`, getAuthHeaders(accessToken));
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch playlist data: ${error.message}`);
  }
};

// Function to fetch tracks in a playlist
export const fetchPlaylistTracksData = async (accessToken, playlistId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/playlists/${playlistId}/tracks`, getAuthHeaders(accessToken));

    const totalDurationMs = data.items.reduce((total, { track }) => total + track.duration_ms, 0);
    return { items: data.items, totalDurationMs };
  } catch (error) {
    throw new Error(`Failed to fetch playlist tracks data: ${error.message}`);
  }
};

// Function to fetch album data
export const fetchAlbumData = async (accessToken, albumId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/albums/${albumId}`, getAuthHeaders(accessToken));
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch album data: ${error.message}`);
  }
};

// Function to fetch tracks in an album
export const fetchAlbumTracksData = async (accessToken, albumId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/albums/${albumId}/tracks`, getAuthHeaders(accessToken));

    const totalDurationMs = data.items.reduce((total, { duration_ms }) => total + duration_ms, 0);
    return { items: data.items, totalDurationMs };
  } catch (error) {
    throw new Error(`Failed to fetch album tracks data: ${error.message}`);
  }
};

// Function to fetch artist data
export const fetchArtistData = async (accessToken, artistId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/artists/${artistId}`, getAuthHeaders(accessToken));
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch artist data: ${error.message}`);
  }
};

// Function to fetch top tracks of an artist
export const fetchArtistTracksData = async (accessToken, artistId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/artists/${artistId}/top-tracks?market=US`, getAuthHeaders(accessToken));
    
    return data.tracks.map(({ name, album, duration_ms, popularity }) => ({
      name,
      album: album.name,
      imageUrl: album.images[0]?.url,
      duration_ms,
      popularity,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch artist's top tracks: ${error.message}`);
  }
};

// Function to fetch user data
export const fetchUserData = async (accessToken, userId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/${userId}`, getAuthHeaders(accessToken));
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};
