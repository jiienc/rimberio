import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import PlayerContextProvider from './context/PlayerContext.jsx';
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <PlayerContextProvider>
              <App />
          </PlayerContextProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
