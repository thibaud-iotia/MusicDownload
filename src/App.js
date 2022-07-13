import "./Styles/index.scss"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MusicDownload from"./Pages/musicDownload"
import NotFound from "./Pages/NotFound"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact="true" element={<MusicDownload/>} />
          <Route path='/Music' exact="true" element={<MusicDownload/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
