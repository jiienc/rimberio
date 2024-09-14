/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useRef, useState, useEffect } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef(null);
    const seekBg = useRef(null);
    const seekBar = useRef(null);

    const [track, setTrack] = useState(null);
    const [trackName, setTrackName] = useState('');
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    useEffect(() => {
        if (track && audioRef.current) {
            audioRef.current.src = track;
            audioRef.current.load();
            const onLoadedMetadata = () => {
                setTime({
                    ...time,
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                });
                if (playStatus) {
                    audioRef.current.play();
                }
            };
            audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
            return () => {
                audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
            };
        }
    }, [track, playStatus]);

    useEffect(() => {
        const updateCurrentTime = () => {
            if (audioRef.current) {
                setTime(prevTime => ({
                    ...prevTime,
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    }
                }));
            }
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', updateCurrentTime);
            return () => {
                audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
            };
        }
    }, [track]);

    const play = () => {
        if (audioRef.current && !playStatus) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const pause = () => {
        if (audioRef.current && playStatus) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    const playTrack = (trackUrl, name) => {
        if (track !== trackUrl) {
            setTrack(trackUrl);
            setTrackName(name);
            play();
        } else if (playStatus) {
            pause();
        } else {
            play();
        }
    };

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        trackName,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playTrack,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
            <audio ref={audioRef} preload='auto' />
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
