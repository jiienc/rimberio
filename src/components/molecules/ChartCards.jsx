import React from 'react';
import { usePlaylistData } from '../../hooks/usePlaylistData.jsx';
import PlaylistCard from '../atoms/PlaylistCard.jsx';

const ChartCards = () => {
    const playlistIds = [
        '37i9dQZEVXbNG2KDcFcKOF',
        '37i9dQZEVXbIZK8aUquyx8',
        '37i9dQZEVXbMDoHDwVN2tF',
        '37i9dQZEVXbObFQZ3JLcXt',
        '37i9dQZEVXbLiRSasKsNU9',
        '37i9dQZEVXbKpV6RVDTWcZ'
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

export default ChartCards;
