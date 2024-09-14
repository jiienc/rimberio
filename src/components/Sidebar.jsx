import { Library, Search, Add } from '../assets/icons/icon.js';
import { usePlaylistData } from '../hooks/usePlaylistData.jsx';
import { useAlbumData } from '../hooks/useAlbumData.jsx';
import { useArtistData } from '../hooks/useArtistData.jsx';

const Sidebar = () => {
    const { playlistName, playlistImage, playlistOwner } = usePlaylistData('37i9dQZF1DX4V6WLWzdIgr');
    const { albumName, albumImage, albumArtist } = useAlbumData('5agEAxt8vks5Xk0NfEbI5D');
    const { artistName, artistImage } = useArtistData('1NjxFrpEGZTV2Ny0OJxeWu');

    return (
        <div className='w-[20%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
            <div className='bg-neutral-900 h-full rounded-xl'>
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <Library className='cursor-pointer text-violet-700' aria-label="Library" />
                        <p className='font-bold'>Your Library</p>
                    </div>
                    <div className='flex text-right gap-3'>
                        <Add className='cursor-pointer text-violet-700 hover:text-violet-500' aria-label="Add" />
                    </div>
                </div>
                <div className='flex flex-col gap-4 p-4'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-neutral-800 rounded-full p-2 cursor-pointer hover:bg-neutral-700'>
                            <p className='text-white px-1'>Playlists</p>
                        </div>
                        <div className='bg-neutral-800 rounded-full p-2 cursor-pointer hover:bg-neutral-700'>
                            <p className='text-white px-1'>Albums</p>
                        </div>
                        <div className='bg-neutral-800 rounded-full p-2 cursor-pointer hover:bg-neutral-700'>
                            <p className='text-white px-1'>Artists</p>
                        </div>
                    </div>
                    <div className='bg-neutral-800 rounded-full flex items-center px-3 py-1'>
                        <Search className='text-violet-700' aria-label="Search" />
                        <input 
                            type='text' 
                            placeholder='Search your library' 
                            className='bg-transparent outline-none pl-2 text-neutral-700 flex-grow'
                            aria-label="Search input"
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-4 p-4'>
                    <div className='flex items-center gap-3 hover:bg-neutral-700 rounded-xl cursor-pointer'>
                        <img src={playlistImage} alt={`${playlistName} cover`} className='h-10 w-10 rounded-full' />
                        <div>
                            <p className='text-white'>{playlistName}</p>
                            <p className='text-gray-400'>Playlist • {playlistOwner}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 hover:bg-neutral-700 rounded-xl cursor-pointer'>
                        <img src={albumImage} alt={`${albumName} cover`} className='h-10 w-10 rounded-full' />
                        <div>
                            <p className='text-white'>{albumName}</p>
                            <p className='text-gray-400'>Album • {albumArtist}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 hover:bg-neutral-700 rounded-xl cursor-pointer'>
                        <img src={artistImage} alt={`${artistName} cover`} className='h-10 w-10 rounded-full' />
                        <div>
                            <p className='text-white'>{artistName}</p>
                            <p className='text-gray-400'>Artist</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
