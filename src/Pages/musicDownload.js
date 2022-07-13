import React from 'react';
import Musics from '../Components/Musics';
import AppBar from '../Components/AppBar';

const musicDownload = () => {
    return (
        <div className='MusicDownload'>
            <AppBar/>
            <Musics/>
        </div>
    );
};

export default musicDownload;