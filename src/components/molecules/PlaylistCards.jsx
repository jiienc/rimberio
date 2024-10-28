import React from 'react';
import { usePlaylistData } from '../../hooks/usePlaylistData.jsx';
import PlaylistCard from '../atoms/PlaylistCard.jsx';

const ChartCards = () => {
    const playlistIds = [
        '37i9dQZF1DXa2PvUpywmrr',
        '37i9dQZF1DX4WYpdgoIcn6',
        '37i9dQZF1DX7F6T2n2fegs',
        '37i9dQZF1DWXRqgorJj26U',
        '37i9dQZF1DX5Vy6DFOcx00',
        '37i9dQZF1DXdLK5wjKyhVm'
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
