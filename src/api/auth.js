import axios from 'axios';

const CLIENT_ID = '20c503eb948f4ee09a1722b3690e528f';
const CLIENT_SECRET = '80b07e54fc9e4e41a7a1ba8fa60bf0b4';
const AUTH_URL = 'https://accounts.spotify.com/api/token';

export const getAccessToken = async () => {
    try {
        const response = await axios.post(AUTH_URL, 'grant_type=client_credentials', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
            },
        });

        return response.data.access_token;
    } catch (error) {
        throw new Error(error.message);
    }
};
