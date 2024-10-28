import { useContext } from 'react';
import './styles/index.css'
import { PlayerContext } from './context/PlayerContext.jsx';
import Sidebar from "./components/organisms/Sidebar.jsx";
import Player from "./components/organisms/Player.jsx";
import Display from "./components/pages/Display.jsx";
import Navbar from './components/organisms/Navbar.jsx';

const App = () => {
    const { audioRef, track } = useContext(PlayerContext);

    return (
        <div className="h-screen bg-black font-nunito">
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
