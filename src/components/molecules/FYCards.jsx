import React from 'react';
import { usePlaylistData } from '../../hooks/usePlaylistData.jsx';
import PlaylistCard from '../atoms/PlaylistCard.jsx';

const FYCards = () => {
    const playlistIds = [
        '37i9dQZF1DWSnRSDTCsoPk',
        '37i9dQZF1DWWhB4HOWKFQc',
        '37i9dQZF1DX4V6WLWzdIgr'
    ];

    return (
        <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
            <div className="flex overflow-auto">
                {playlistIds.map((id, index) => {
                    const { playlistName, playlistImage, playlistDesc } = usePlaylistData(id);
                    return (
                        <PlaylistCard
                            key={index}
                            id={id}
                            playlistName={playlistName}
                            playlistImage={playlistImage}
                            playlistDesc={playlistDesc}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FYCards;
