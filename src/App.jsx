import { useContext } from 'react';
import { PlayerContext } from './context/PlayerContext.jsx';
import Sidebar from "./components/Sidebar.jsx";
import Player from "./components/Player.jsx";
import Display from "./components/Display.jsx";
import Navbar from './components/Navbar.jsx';

const App = () => {
    const { audioRef, track } = useContext(PlayerContext);

    return (
        <div className="h-screen bg-black">
            <div className='h-[6%] flex'>
                <Navbar />
            </div>
            <div className='h-[84%] flex'>
                <Sidebar />
                <Display />
            </div>
            <Player />
            <audio ref={audioRef} src={track} preload='auto'/>
        </div>
    );
};

export default App;
