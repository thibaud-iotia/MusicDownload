import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
// import axios from 'axios';


export default function Music({ videoData }) {
  // console.log(videoData);
  const data = videoData.snippet;
  const [videoUrl, setVideoUrl] = useState("");
  // const downloadexe = async (url, path) => {
  //   try {
  //     const response = await axios({
  //       method: "GET",
  //       url: url
  //     })
  //     // Do something with the response
  //     console.log(response)
  //   } catch (err) {
  //     // Handling errors
  //   }
  // };
  const downloadData = async (url) =>{
    console.log(url)
    window.location.href = url;
  }
  const downloadVideo = (videoId) => {
    console.log("Video id : " + videoId);
    // setVideoUrl("https://www.youtube.com/embed/" + videoId);
    setVideoUrl("https://www.youtube.com/watch?v=" + videoId);
    //download the video
    downloadData("http://172.17.224.1:4000/download?URL=" + videoUrl,"test");
  }
  return (
    <Box display="inline-block" sx={{width: 600 }}>
      <Card sx={{ margin : 1 }} onClick={(e) => downloadVideo(videoData.id.videoId)}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
              image={data.thumbnails.high.url}
            alt="image of Youtube video"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>

  );
}