import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumCard = ({ id, albumName, albumImage, artistName }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/album/${id}`)}
            className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] w-[16.66666666666667%]"
        >
            <img className="rounded" src={albumImage} alt={albumName} />
            <p className="font-bold mt-2 mb-1">{albumName}</p>
            <p className="text-slate-200 text-sm">{artistName}</p>
        </div>
    );
};

export default AlbumCard;
