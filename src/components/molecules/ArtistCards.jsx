import React from 'react';
import { useArtistData } from '../../hooks/useArtistData.jsx';
import ArtistCard from '../atoms/ArtistCard.jsx';

const ArtistCards = () => {
    const artistIds = [
        '3wOsYKZM0zcKNasi3I7fP4',
        '6Sv2jkzH9sWQjwghW5ArMG',
        '2iDVt6mFbtbDEZG5ax0dTi',
        '1NjxFrpEGZTV2Ny0OJxeWu',
        '1v1khTmozNfxB2ET1Ep288',
        '3tMTXQyRrPmMyHv5SoC0TV'
    ];

    return (
        <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Popular Artists</h1>
            <div className="flex overflow-auto">
                {artistIds.map((id, index) => {
                    const { artistName, artistImage } = useArtistData(id);

                    return (
                        <ArtistCard
                            key={index}
                            id={id}
                            artistName={artistName}
                            artistImage={artistImage}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ArtistCards;
