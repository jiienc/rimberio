/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext.jsx';
import { Add, Shuffle, SkipPrev, Play, Pause, SkipNext, Repeat, Slideshow, Mic, Queue, Volume, MiniPlayer, Full } from '../assets/icons/icon.js';

const Player = () => {
    const { seekBar, seekBg, playStatus, play, pause, trackName, songImage, songArtist, audioRef } = useContext(PlayerContext);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            const updateTime = () => {
                setCurrentTime(formatTime(audioRef.current.currentTime));
                setDuration(formatTime(audioRef.current.duration));
                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
            };

            audioRef.current.addEventListener('timeupdate', updateTime);
            audioRef.current.addEventListener('loadedmetadata', updateTime);

            return () => {
                audioRef.current.removeEventListener('timeupdate', updateTime);
                audioRef.current.removeEventListener('loadedmetadata', updateTime);
            };
        }
    }, [audioRef.current]);

    const formatTime = (time) => {
        if (isNaN(time) || time === Infinity) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSeek = (event) => {
        const width = seekBg.current.clientWidth;
        const offsetX = event.nativeEvent.offsetX;
        const newTime = (offsetX / width) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };

    return (
        <div className='h-[10%] bg-neutral-900 flex justify-between items-center text-white px-4'>
            <div className='flex items-center p-2 gap-2'>
                <img src={songImage} alt={trackName} className='h-16 w-16 rounded-lg' />
                <div className='flex flex-col justify-center flex-grow'>
                    <p className='text-white truncate w-24'>{trackName}</p>
                    <p className='text-gray-400'>{songArtist}</p>
                </div>
                <div className='flex items-center justify-center text-white'>
                    <div className='flex items-center justify-center rounded-full border border-violet-700 cursor-pointer text-violet-700 hover:text-violet-500'>
                        <Add />
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4'>
                    <Shuffle className='cursor-pointer text-violet-700 hover:text-violet-500'/>
                    <SkipPrev className='cursor-pointer text-violet-700 hover:text-violet-500'/>
                    {playStatus ? (
                        <Pause onClick={pause} className='cursor-pointer text-violet-700 hover:text-violet-500'/>
                    ) : (
                        <Play onClick={play} className='cursor-pointer text-violet-700 hover:text-violet-500'/>
                    )}
                    <SkipNext className='cursor-pointer text-violet-700 hover:text-violet-500'/>
                    <Repeat className='cursor-pointer text-violet-700 hover:text-violet-500'/>
                </div>
                <div className='flex items-center gap-5'>
                    <p>{currentTime}</p>
                    <div 
                        ref={seekBg} 
                        className='w-[60vw] max-w-[500px] bg-violet-700 rounded-full cursor-pointer'
                        onClick={handleSeek}
                    >
                        <div 
                            ref={seekBar} 
                            className='h-1 border-none bg-violet-400 rounded-full'
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p>{duration}</p>
                </div>
            </div>
            <div className='hidden lg:flex items-center gap-3 opacity-75'>
                <Slideshow className='cursor-pointer text-violet-700 hover:text-violet-500'/>
                <Mic className='cursor-pointer text-violet-700 hover:text-violet-500'/>
                <Queue className='cursor-pointer text-violet-700 hover:text-violet-500'/>
                <Volume className='cursor-pointer text-violet-700'/>
                <div className='w-20 bg-violet-700 h-1 rounded'></div>
                <MiniPlayer className='cursor-pointer text-violet-700 hover:text-violet-500'/>
                <Full className='cursor-pointer text-violet-700 hover:text-violet-500'/>
            </div>
        </div>
    );
};

export default Player;
