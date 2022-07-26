import axios from 'axios';
import React, { useState } from 'react';
import SearchBar from "material-ui-search-bar";
import Music from './Music';


const Musics = () => {
    //to set research
    const [searched, setSearched] = useState("");
    const [result, setResult] = useState([]);
    //all video id
    const ids = [];
    const duration = [];
    //send request
    const setRequestSearch = async (newValue) => {
        setSearched(newValue);
        if (result !== "") {
            await axios
                .get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + searched + "&key=" + process.env.REACT_APP_YOUTUBE_API_KEY)
                .then(res => {
                    //save video ids in table
                    result.forEach((item) => {
                        ids.push(item.id.videoId);
                    });
                    addVideoTime(res.data.items);
                    setResult(res.data.items);
                    //console.log(result)
                });
                // .then((res) => 
                //     setResult(res.data.items)
                // );
        }
    }
    function convertISO8601ToSeconds(input) {

        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;

        if (reptms.test(input)) {
            var matches = reptms.exec(input);
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);
            totalseconds = hours * 3600  + minutes * 60 + seconds;
        }
        // var minutes = Math.floor(totalseconds / 60);
        // var seconds = totalseconds - minutes * 60;
        return (hours + ":" + minutes + ":" + seconds);
    }
    const addVideoTime = async (result) =>{
        for await (const [i, id] of ids.entries()) {
            await axios
            .get("https://www.googleapis.com/youtube/v3/videos?id=" + id +"&part=contentDetails&key=" + process.env.REACT_APP_YOUTUBE_API_KEY)
            .then(res => {
                //duration.push(res.data.items[0].contentDetails.duration);
                //duration.push(convertISO8601ToSeconds(res.data.items[0].contentDetails.duration));
                let duration = convertISO8601ToSeconds(res.data.items[0].contentDetails.duration);
                //setResult(result[i].duration[duration])
                result[i]["snippet"]["duration"] = duration;
                //console.log(result);
            })
        }
        //console.log(duration)
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