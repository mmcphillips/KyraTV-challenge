import React from 'react';
import VideoEntry from './VideoEntry.jsx';
import { Grid, Typography } from '@material-ui/core/';
import { SGrid, SPH } from '../styles.jsx';

const VideoList = ({ videos, handleClick }) => (
  <Grid
    container
    direction="row"
    justify="space-around"
    alignItems="flex-start"
  >
    <Typography
      variant="headline"
      component="h3"
      style={SPH}
    >
          Kyra Videos
    </Typography>
    {videos.map((video) => <VideoEntry video={video} key={video.id} handleClick={handleClick} />)}
  </Grid>
);

export default VideoList;
