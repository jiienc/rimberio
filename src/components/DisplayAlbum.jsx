import Navigation from './Navigation.jsx';
import { useParams } from 'react-router-dom';
import { useAlbumData } from '../hooks/useAlbumData.jsx';
import { useArtistData } from '../hooks/useArtistData.jsx';
import { Play, Add, Time } from '../assets/icons/icon.js';

const DisplayAlbum = () => {
    const {id} = useParams();
    const { albumName, 
        albumImage,
        albumArtist,
        albumArtistID,
        albumYear,
        albumTotal,
        albumTotalDuration,
        tracks
    } = useAlbumData(id);
    const { artistImage } = useArtistData(albumArtistID);

    const formatDuration = (durationMs) => {
        const totalSeconds = Math.floor(durationMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <Navigation />
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-48 rounded' src={albumImage} alt={albumName}/>
                <div className='flex flex-col'>
                    <p>Album</p>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumName}</h2>
                    <p className='mt-1'>
                        <img className='inline-block w-5' src={artistImage} alt=''/>
                        <b> {albumArtist} • {albumYear} • {albumTotal} songs,</b> about {albumTotalDuration}
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
            <div className='grid grid-cols-2 sm:grid-cols-3 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Title</p>
                <Time className='m-auto sm:ml-auto' />
            </div>
            <hr className='border-[#444]' />
            {tracks.map((item, index) => (
                <div key={index} className='grid grid-cols-2 sm:grid-cols-3 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                    <p className='text-white'>
                        <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                        <span>{item.name}</span>
                    </p>
                    <p className='text-[15px] text-right sm:text-center'>{formatDuration(item.duration_ms)}</p>
                </div>
            ))}
        </>
    )
}

export default DisplayAlbum;