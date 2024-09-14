import { useContext } from 'react';
import Navigation from './Navigation.jsx';
import { useParams } from 'react-router-dom';
import { usePlaylistData } from '../hooks/usePlaylistData.jsx';
import { useUserData } from '../hooks/useUserData.jsx';
import { PlayerContext } from '../context/PlayerContext.jsx';
import { Play, Add, Time } from '../assets/icons/icon.js';

const DisplayPlaylist = () => {
    const { id } = useParams();
    const {
        playlistName, 
        playlistImage, 
        playlistDesc, 
        playlistFollower, 
        playlistTotal, 
        playlistOwner, 
        playlistOwnerID, 
        playlistTotalDuration,
        tracks
    } = usePlaylistData(id);
    const { userImage } = useUserData(playlistOwnerID);
    const { playTrack } = useContext(PlayerContext);

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const formatDuration = (durationMs) => {
        const totalSeconds = Math.floor(durationMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const formatDateDifference = (addedAt) => {
        const addedDate = new Date(addedAt);
        const today = new Date();
        const timeDiff = today - addedDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
        if (daysDiff <= 7) {
            return `${daysDiff} days ago`;
        } else {
            const weeksDiff = Math.floor(daysDiff / 7);
            return `${weeksDiff} weeks ago`;
        }
    };

    return (
        <>
            <Navigation />
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-48 rounded' src={playlistImage} alt={playlistName} />
                <div className='flex flex-col'>
                    <p>Playlist</p>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{playlistName}</h2>
                    <h4>{playlistDesc}</h4>
                    <p className='mt-1'>
                        {userImage && (
                            <img className='inline-block w-5' src={userImage} alt='' />
                        )}
                        <b> {playlistOwner} • {formatNumber(playlistFollower)} saves • {playlistTotal} songs,</b> about {playlistTotalDuration}
                    </p>
                </div>
            </div>
            <div className='flex items-center gap-8 mt-10'>
                <div className='bg-violet-700 p-3 rounded-full flex items-center justify-center'>
                    <Play className='text-black' />
                </div>
                <div className='bg-violet-700 p-1 rounded-full flex items-center justify-center'>
                    <Add className='text-black' />
                </div>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Title</p>
                <p>Album</p>
                <p className='hidden sm:block'>Date Added</p>
                <Time className='m-auto'/>
            </div>
            <hr className='border-[#444]' />
            {tracks.map((item, index) => (
                <div 
                    key={index}
                    className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'
                    onClick={() => playTrack(item.track.preview_url, item.track.name)}
                >
                    <p className='text-white truncate'>
                        <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                        {item.track.album.images[0]?.url && (
                            <img className='inline w-10 mr-5' src={item.track.album.images[0].url} alt={item.track.name} />
                        )}
                        <span>{item.track.name}</span>
                    </p>
                    <p className='text-[15px]'>{item.track.album.name}</p>
                    <p className='text-[15px] hidden sm:block'>{formatDateDifference(item.added_at)}</p>
                    <p className='text-[15px] text-center'>{formatDuration(item.track.duration_ms)}</p>
                </div>
            ))}
        </>
    );
};

export default DisplayPlaylist;
