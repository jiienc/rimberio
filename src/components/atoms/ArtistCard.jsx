import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ id, artistName, artistImage }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/artist/${id}`)}
            className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] w-[16.66666666666667%]"
        >
            <img
                className="artist-image rounded-full object-cover w-[200px] h-[200px] mx-auto"
                src={artistImage}
                alt={artistName}
            />
            <p className="font-bold mt-2 mb-1 text-center">{artistName}</p>
        </div>
    );
};

export default ArtistCard;
