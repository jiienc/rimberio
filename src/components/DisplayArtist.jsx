// import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import { useArtistData } from '../hooks/useArtistData.jsx';
// import { PlayerContext } from '../context/PlayerContext.jsx';
import { Verified, Play } from '../assets/icons/icon.js';

const DisplayArtist = () => {
    const { id } = useParams();
    const { artistName, artistImage, artistFollowers, tracks } = useArtistData(id);
    // const { playTrack } = useContext(PlayerContext);

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const formatDuration = (durationMs) => {
        const totalSeconds = Math.floor(durationMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <Navigation />
            <div className="relative w-full h-96 mt-5">
                <img src={artistImage} alt={artistName} className="w-full h-full object-cover roumded-xl" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
                    <div className="flex items-center mb-4">
                        <Verified className="w-6 h-6 mr-2 text-blue-700" />
                        <span className="text-white text-sm font-semibold">Verified Artist</span>
                    </div>
                    <h1 className="text-white text-6xl font-bold mb-2">{artistName}</h1>
                    <p className="text-white text-lg mb-4 mt-4">{formatNumber(artistFollowers)} monthly listeners</p>
                </div>
            </div>
            <div className='flex items-center gap-8 mt-10'>
                <div className='bg-violet-700 p-3 rounded-full flex items-center justify-center cursor-pointer'>
                    <Play className='text-black' />
                </div>
                <div className='border-2 border-neutral-500 hover:border-white pt-1 pb-1 pl-2 pr-2 rounded-full flex items-center justify-center cursor-pointer'>
                    <p className='text-white px-1'>Follow</p>
                </div>
            </div>
            <div className="flex">
                <div className="flex-1 p-4">
                    <h2 className="text-white text-2xl font-bold mb-7 mt-5">Popular</h2>
                    <ul>
                    {tracks.map((track, index) => (
                        <li key={index} className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <span className="text-white text-lg font-semibold mr-4">{index + 1}</span>
                            <img src={track.imageUrl} alt={track.name} className="h-12 w-12 rounded mr-4" />
                            <span className="text-white truncate w-40">{track.name}</span>
                        </div>
                        <div className="text-gray-400">{formatDuration(track.duration_ms)}</div>
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="flex-1">
                    <h2 className="text-white text-2xl font-bold mb-7 mt-5">Artist pick</h2>
                    <div className="p-4 rounded-lg flex flex-col items-start">
                        {tracks.length > 0 && (
                            <div key={tracks[0].id} className="relative mb-4">
                                <img src={tracks[0].imageUrl} alt={tracks[0].name} className="h-300 w-300 rounded-lg" />
                                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-2 rounded">
                                    <p className="text-white">Description</p>
                                </div>
                                <div className="mt-4">
                                    <p className="text-white text-lg font-bold">{tracks[0].name}</p>
                                    <p className="text-gray-400">Song</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DisplayArtist;
