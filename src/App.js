import "./Styles/index.scss"
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import MusicDownload from"./Pages/musicDownload"
import NotFound from "./Pages/NotFound"

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' exact="true" element={<MusicDownload/>} />
          <Route path='/Music' exact="true" element={<MusicDownload/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
