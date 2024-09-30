import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome.jsx";
import DisplayPlaylist from './DisplayPlaylist.jsx';
import DisplayAlbum from './DisplayAlbum.jsx';
import DisplayArtist from './DisplayArtist.jsx';
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

    const isColorLight = (color) => {
        let r, g, b;
    
        if (color.match(/^rgb/)) {
            color = color.match(/rgba?\(([^)]+)\)/)[1];
            color = color.split(/ *, */).map(Number);
            r = color[0];
            g = color[1];
            b = color[2];
        } else if ('#' === color[0] && 7 === color.length) {
            r = parseInt(color.slice(1, 3), 16);
            g = parseInt(color.slice(3, 5), 16);
            b = parseInt(color.slice(5, 7), 16);
        } else if ('#' === color[0] && 4 === color.length) {
            r = parseInt(color[1] + color[1], 16);
            g = parseInt(color[2] + color[2], 16);
            b = parseInt(color[3] + color[3], 16);
        }
    
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128;
    };    

    useEffect(() => {
        if ((isPlaylist || isAlbum) && dominantColor && darkerColor && lighterColor) {
            const backgroundColor = `linear-gradient(270deg, ${dominantColor}, ${darkerColor}, ${lighterColor})`;
            displayRef.current.style.background = backgroundColor;
            
            const middleColor = '#483C32';
            if (isColorLight(lighterColor)) {
                displayRef.current.style.background = middleColor;
            }
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
                <Route path='/artist/:id' element={<DisplayArtist />} />
            </Routes>
        </div>
    );
};

export default Display;
