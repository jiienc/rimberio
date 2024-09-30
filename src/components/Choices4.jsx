/* eslint-disable react-hooks/rules-of-hooks */
import { useArtistData } from '../hooks/useArtistData.jsx';
import { useNavigate } from 'react-router-dom';

const Choices4 = () => {
    const artistIds = [
        '3wOsYKZM0zcKNasi3I7fP4',
        '6Sv2jkzH9sWQjwghW5ArMG',
        '2iDVt6mFbtbDEZG5ax0dTi',
        '1NjxFrpEGZTV2Ny0OJxeWu',
        '1v1khTmozNfxB2ET1Ep288',
        '3tMTXQyRrPmMyHv5SoC0TV'
    ];

    const navigate = useNavigate()

    return (
        <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Popular Artists</h1>
            <div className='flex overflow-auto'>
                {artistIds.map((id, index) => {
                    const {artistName, artistImage } = useArtistData(id);

                    return (
                        <div onClick={() => navigate(`/artist/${id}`)}
                            key={index}
                            className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] w-[16.66666666666667%]'>
                            <img
                                className='artist-image rounded-full object-cover w-[200px] h-[200px] mx-auto'
                                src={artistImage}
                                alt={artistName}
                            />
                            <p className='font-bold mt-2 mb-1 text-center'>{artistName}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Choices4;
