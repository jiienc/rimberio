import React from 'react';
import FYCards from "../molecules/FYCards.jsx";
import ChartCards from "../molecules/ChartCards.jsx";
import PlaylistCards from "../molecules/PlaylistCards.jsx";
import AlbumCards from "../molecules/AlbumCards.jsx";
import ArtistCards from "../molecules/ArtistCards.jsx";

const Content = () => {
    return (
        <>
            <FYCards />
            <ChartCards />
            <PlaylistCards />
            <AlbumCards />
            <ArtistCards />
        </>
    );
};

export default Content;