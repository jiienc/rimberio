import { useNavigate } from 'react-router-dom';
import { Prev, Next } from '../../assets/icons/icon.js';

const DisplayHome = () => {
    const navigate = useNavigate();

    return (
        <div className='flex items-center gap-2'>
            <Prev 
                onClick={() => navigate(-1)} 
                className='cursor-pointer text-violet-700 hover:text-violet-500 rounded-full bg-gray-800 p-0.5'
                aria-label="Go Back" 
            />
            <Next 
                onClick={() => navigate(1)} 
                className='cursor-pointer text-violet-700 hover:text-violet-500 rounded-full bg-gray-800 p-0.5'
                aria-label="Go Forward" 
            />
        </div>
    );
};

export default DisplayHome;
