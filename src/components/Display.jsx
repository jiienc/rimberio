import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome.jsx";
import DisplayPlaylist from './DisplayPlaylist.jsx';
import DisplayAlbum from './DisplayAlbum.jsx';
import { usePlaylistData } from '../hooks/usePlaylistData.jsx';
import { useAlbumData } from '../hooks/useAlbumData.jsx';
import { useExtractColor } from "react-extract-colors";

const Display = () => {
    const displayRef = useRef();
    const location = useLocation();

    const isPlaylist = location.pathname.includes("playlist");
    const isAlbum = location.pathname.includes("album");

    const id = location.pathname.split("/").pop();
    const { playlistImage } = usePlaylistData(isPlaylist ? id : "");
    const { albumImage } = useAlbumData(isAlbum ? id : "");

    const image = isPlaylist ? playlistImage : isAlbum ? albumImage : "";
    const { dominantColor, darkerColor, lighterColor } = useExtractColor(image);

    useEffect(() => {
        if ((isPlaylist || isAlbum) && dominantColor && darkerColor && lighterColor) {
            displayRef.current.style.background = `linear-gradient(270deg, ${dominantColor}, ${darkerColor}, ${lighterColor})`;
        } else {
            displayRef.current.style.background = '#171717';
        }
    }, [isPlaylist, isAlbum, dominantColor, darkerColor, lighterColor]);

    return (
        <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded-xl bg-neutral-900 text-white overflow-auto lg:w-[80%] lg:ml-0'>
            <Routes>
                <Route path='/' element={<DisplayHome />} />
                <Route path='/playlist/:id' element={<DisplayPlaylist />} />
                <Route path='/album/:id' element={<DisplayAlbum />} />
            </Routes>
        </div>
    );
};

export default Display;
