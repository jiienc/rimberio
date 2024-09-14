/* eslint-disable no-unused-vars */
import React from 'react';
import { assets } from '../assets/images/image.js';
import { Home, Search, Browse} from '../assets/icons/icon.js';

const Navbar = () => {
    return (
        <>
            <div className='w-full h-full flex items-center justify-between font-semibold p-4'>
                <div className='flex items-center gap-3 cursor-pointer mx-8'>
                    <img src={assets.logo} alt="Company Logo" className='h-10 w-10' />
                </div>
                <div className='flex items-center gap-4 cursor-pointer mx-8 w-full max-w-md'>
                    <div className='bg-neutral-800 rounded-full p-2 cursor-pointer flex items-center justify-center hover:bg-neutral-700'>
                        <Home className='text-violet-700' aria-label="Home" />
                    </div>
                    <div className='bg-neutral-800 rounded-full flex items-center px-3 py-1 flex-grow hover:bg-neutral-700'>
                        <Search className='text-violet-700' aria-label="Search" />
                        <input 
                            type='text' 
                            placeholder='What would you like to play?' 
                            className='bg-transparent outline-none pl-2 text-slate-700 flex-grow'
                            aria-label="Search input"
                        />
                        <span className='text-violet-700 px-2'>|</span>
                        <Browse className='text-violet-700' aria-label="Browse" />
                    </div>
                </div>
                <div className='flex items-center gap-4 cursor-pointer'>
                    <p className='bg-purple-500 text-black w-8 h-8 rounded-full flex items-center justify-center'>A</p>
                </div>
            </div>
        </>
    );
};

export default Navbar;