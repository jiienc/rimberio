import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlaylistCard = ({ id, playlistName, playlistImage, playlistDesc }) => {
    const navigate = useNavigate();

    const firstSentence = playlistDesc.split(/\.|!/)[0];

    return (
        <div
            onClick={() => navigate(`/playlist/${id}`)}
            className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] w-[16.66666666666667%]"
        >
            <img className="rounded" src={playlistImage} alt={playlistName} />
            <p className="font-bold mt-2 mb-1">{playlistName}</p>
            <p className="text-slate-200 text-sm">{firstSentence}</p>
        </div>
    );
};

export default PlaylistCard;
