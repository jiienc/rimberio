import React from 'react';
import { useAlbumData } from '../../hooks/useAlbumData.jsx';
import AlbumCard from '../atoms/AlbumCard.jsx';

const AlbumCards = () => {
    const albumIds = [
        '1vva4fJyjXaJ2RDsGmIbCv',
        '5agEAxt8vks5Xk0NfEbI5D',
        '1DAuVHMlBvIjzWZALSUXbn',
        '5Y5dkZeSlePrTopuETspAh',
        '5uAcLj2EJLtQtKMyDYCI0Q',
        '3R4IAF9ApqYeUQrv1ddyoR'
    ];

    return (
        <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Popular Albums</h1>
            <div className="flex overflow-auto">
                {albumIds.map((id, index) => {
                    const { albumName, albumImage, artistName } = useAlbumData(id);

                    return (
                        <AlbumCard
                            key={index}
                            id={id}
                            albumName={albumName}
                            albumImage={albumImage}
                            artistName={artistName}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AlbumCards;
