import React from 'react';
import {
  Card, CardMedia, CardContent, Typography,
} from '@material-ui/core/';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  SP, SPS, SPMobile, SPT, SCardM, SCardL, SCardS, SCardMobile, SCardContent, SCardContentS, SCardMedia,
} from '../styles.jsx';

const VideoEntry = ({ video, handleClick }) => {
  const theme = useTheme();// access predetermined breakpoints from Material UI
  const large = useMediaQuery(theme.breakpoints.up('1280'));// screen width > 1280px
  const medium = useMediaQuery(theme.breakpoints.up('960'));// screen width > 960px
  const small = useMediaQuery(theme.breakpoints.up('760'));// screen width > 760px
  const mobile = useMediaQuery(theme.breakpoints.down('760'));// screen widths below 760px

  if (large) {
    return (
      <Card
        style={SCardL}
      >
        <CardMedia
          style={SCardMedia}
          component="img"
          onClick={() => handleClick(video.snippet.resourceId.videoId)}
          image={video.snippet.thumbnails.standard.url}
          title={video.snippet.title}
        />
        <CardContent
          style={SCardContent}
        >
          <Typography
            gutterBottom
            variant="headline"
            component="h4"
            style={SPT}
          >
            {video.snippet.title}
          </Typography>
          <Typography
            caption
            component="p"
            style={SP}
          >
            {video.snippet.publishedAt.slice(0, 10)}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  if (medium) {
    return (
      <Card
        style={SCardM}
      >
        <CardMedia
          style={SCardMedia}
          component="img"
          onClick={() => handleClick(video.snippet.resourceId.videoId)}
          image={video.snippet.thumbnails.standard.url}
          title={video.snippet.title}
        />
        <CardContent
          style={SCardContent}
        >
          <Typography
            gutterBottom
            variant="headline"
            component="h4"
            style={SPT}
          >
            {video.snippet.title}
          </Typography>
          <Typography
            caption
            component="p"
            style={SP}
          >
            {video.snippet.publishedAt.slice(0, 10)}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  if (small) {
    return (
      <Card
        style={SCardS}
      >
        <CardMedia
          style={SCardMedia}
          component="img"
          onClick={() => handleClick(video.snippet.resourceId.videoId)}
          image={video.snippet.thumbnails.standard.url}
          title={video.snippet.title}
        />
        <CardContent
          style={SCardContentS}
        >
          <Typography
            gutterBottom
            variant="headline"
            component="h4"
            style={SPS}
          >
            {video.snippet.title}
          </Typography>
          <Typography
            caption
            component="p"
            style={SP}
          >
            {video.snippet.publishedAt.slice(0, 10)}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      style={SCardMobile}
    >
      <CardMedia
        style={SCardMedia}
        component="img"
        onClick={() => handleClick(video.snippet.resourceId.videoId)}
        image={video.snippet.thumbnails.standard.url}
        title={video.snippet.title}
      />
      <CardContent
        style={SCardContentS}
      >
        <Typography
          gutterBottom
          variant="headline"
          component="h4"
          style={SPMobile}
        >
          {video.snippet.title}
        </Typography>
        <Typography
          caption
          component="p"
          style={SP}
        >
          {video.snippet.publishedAt.slice(0, 10)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoEntry;
