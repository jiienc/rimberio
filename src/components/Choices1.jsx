/* eslint-disable react-hooks/rules-of-hooks */
import { usePlaylistData } from '../hooks/usePlaylistData.jsx';
import { useNavigate } from 'react-router-dom';

const Choices1 = () => {
    const playlistIds = [
        '37i9dQZEVXbNG2KDcFcKOF',
        '37i9dQZEVXbIZK8aUquyx8',
        '37i9dQZEVXbMDoHDwVN2tF',
        '37i9dQZEVXbObFQZ3JLcXt',
        '37i9dQZEVXbLiRSasKsNU9',
        '37i9dQZEVXbKpV6RVDTWcZ'
    ];

    const navigate = useNavigate()

    return (
        <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
            <div className='flex overflow-auto'>
                {playlistIds.map((id, index) => {
                    const {playlistName, playlistImage, playlistDesc } = usePlaylistData(id);
                    
                    const firstSentence = playlistDesc.split(/\.|!/)[0];

                    return (
                        <div onClick={() => navigate(`/playlist/${id}`)} 
                            key={index} 
                            className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] w-[16.66666666666667%]'>
                            <img className='rounded' src={playlistImage} alt={playlistName}/>
                            <p className='font-bold mt-2 mb-1'>{playlistName}</p>
                            <p className='text-slate-200 text-sm'>{firstSentence}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Choices1;