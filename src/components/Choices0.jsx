/* eslint-disable react-hooks/rules-of-hooks */
import { usePlaylistData } from '../hooks/usePlaylistData.jsx';
import { useNavigate } from 'react-router-dom';

const Choices0 = () => {
    const playlistIds = [
        '37i9dQZF1DWSnRSDTCsoPk',
        '37i9dQZF1DWWhB4HOWKFQc',
        '37i9dQZF1DX4V6WLWzdIgr'
    ];

    const navigate = useNavigate()

    return (
        <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Recently Played</h1>
            <div className='flex overflow-auto'>
                {playlistIds.map((id, index) => {
                    const {playlistName, playlistImage, playlistDesc } = usePlaylistData(id);

                    const firstSentence = playlistDesc.split(/\.|!/)[0];

                    return (
                        <div onClick={() => navigate(`/playlist/${id}`)}
                            key={index}
                            className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] w-[20%]'>
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

export default Choices0;