import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
// import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Badge from '@mui/material/Badge';


export default function Music({ videoData }) {
  console.log(videoData);
  //to select file type
  const [type, setType] = React.useState('');

  const handleChange = (event) => {
      setType(event.target.value);
  };
  //for dialog box
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const data = videoData.snippet;
  const [videoUrl, setVideoUrl] = useState("");
  const confirmDownload = () =>{
    handleClose();
    console.log(type)
    //download the video
    //downloadData("http://192.168.0.14:8080/download?URL=" + videoUrl + "&type=" + type + "&title=" + data.title);
    downloadData("https://downloadmusic.cleverapps.io/download?URL=" + videoUrl + "&type=" + type + "&title=" + data.title);
  }
  const downloadData = async (url) => {
    console.log(url)
    window.location.href = url;
  }
  const downloadVideo = (videoId) => {
    console.log("Video id : " + videoId);
    setVideoUrl("https://www.youtube.com/watch?v=" + videoId);
    handleClickOpen();
  }
  return (
    <Box display="inline-block" sx={{ width: {sm: '10px', md : 300} }}>
      <Card sx={{ margin: 1, height: 450, maxWidth: 600 }} onClick={(e) => downloadVideo(videoData.id.videoId)}>
        <CardActionArea>
          <CardMedia
            sx={{height: "15em", objectFit: 'fill'}}
            component="img"
            // height="140"
            image={data.thumbnails.high.url}
            alt="image of Youtube video"
          />
          <Badge sx={{float: 'right', marginRight: 0.5, marginTop: -2, color: 'white', backgroundColor: 'black'}}>
            <span>{data.duration}</span>
          </Badge>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Choose the file type"}
        </DialogTitle>
        <DialogContent sx={{ marginTop: 1 }}>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="fileType" >File</InputLabel>
            <Select
              labelId="fileType"
              id="selectType"
              value={type}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"mp4"}>Mp4</MenuItem>
              <MenuItem value={"webm"}>Webm(audio)</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmDownload} autoFocus>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
}