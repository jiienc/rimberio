/* eslint-disable react-hooks/rules-of-hooks */
import { useAlbumData } from '../hooks/useAlbumData.jsx';
import { useNavigate } from 'react-router-dom';

const Choices3 = () => {
    const albumIds = [
        '1vva4fJyjXaJ2RDsGmIbCv',
        '5agEAxt8vks5Xk0NfEbI5D',
        '1DAuVHMlBvIjzWZALSUXbn',
        '5Y5dkZeSlePrTopuETspAh',
        '5uAcLj2EJLtQtKMyDYCI0Q',
        '3R4IAF9ApqYeUQrv1ddyoR'
    ];

    const navigate = useNavigate()

    return (
        <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Popular Albums</h1>
            <div className='flex overflow-auto'>
                {albumIds.map((id, index) => {
                    const {albumName, albumImage, artistName } = useAlbumData(id);

                    return (
                        <div onClick={() => navigate(`/album/${id}`)} 
                            key={index}
                            className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] w-[16.66666666666667%]'>
                            <img className='rounded' src={albumImage} alt={albumName}/>
                            <p className='font-bold mt-2 mb-1'>{albumName}</p>
                            <p className='text-slate-200 text-sm'>{artistName}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Choices3;