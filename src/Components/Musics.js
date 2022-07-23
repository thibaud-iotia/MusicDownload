import axios from 'axios';
import React, { useState } from 'react';
import SearchBar from "material-ui-search-bar";
import Music from './Music';


const Musics = () => {
    //to set research
    const [searched, setSearched] = useState("");
    const [result, setResult] = useState([]);
    //send request
    const setRequestSearch = (newValue) => {
        setSearched(newValue);
        if (result !== "") {
            axios
                .get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + searched + "&key=" + process.env.REACT_APP_YOUTUBE_API_KEY)
                .then(res => {
                    setResult(res.data.items);
                  });
                // .then((res) => 
                //     setResult(res.data.items)
                // );
        }
    }
    //reset research
    const cancelSearch = () => {
        setSearched("");
    };
    return (
        <div className='musics'>
            <SearchBar
                value={searched}
                onChange={(newValue) => setSearched(newValue)}
                onRequestSearch={() => setRequestSearch(searched)}
                placeholder="Press enter to search"
            />
            <div className='cards'>
                {result.map((video, id) => (
                    <Music key={id} videoData={video} />
                ))}
            </div>
        </div>
    );

};

export default Musics;