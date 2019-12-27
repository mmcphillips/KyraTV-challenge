//dependencies
import React from 'react';
import axios from 'axios';
//components
import VideoList from './VideoList.jsx';
import CChart from './Chart.jsx';
//utilities
import { get18MonthsAgo, checkValidDate } from '../../../dateChecker.js';
import urlFixer from '../../../urlUpdater.js';
import parserCounter from '../../../parserCounter.js';
//styling
import { Container } from '@material-ui/core/';
import { SContainer } from '../styles.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // rendering
      videos: [],
      height: '',
      width: '',
      // videos for rendering.., from
      history: [],
      loading: true,
      maxVideos: 50,
      id: 'UCvO6uJUVJQ6SrATfsWR5_aA',
      call: 0,
      name: 'PAQ',
      // videoList from from api, does not render
      currentVideos: [],
    };
    // get initial videos on page 1.
    this.getKyraVideos = this.getKyraVideos.bind(this);
    // save resultant videos to state.
    this.saveKyraVideos = this.saveKyraVideos.bind(this);
    // get next successive videos.
    this.getNextVideos = this.getNextVideos.bind(this);
    // build chart from allocated data.
    this.buildChart = this.buildChart.bind(this);
    // request video information persistent in database.
    this.fetcher = this.fetcher.bind(this);
    // add videos that do not exist in database.
    this.updateVideos = this.updateVideos.bind(this);
    // add on click handler
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // allow for on click
    const link = `https://www.youtube.com/watch?v=${e}`;
    window.open(link, '_blank');
  }

  fetcher() {
    // request video information from server, save to state to dynamically render.. Not necessary for this implementation, but could be used for a larger application with multiple channels.
    const { name } = this.state;
    const { currentVideos } = this.state;
    axios.get(`/api/videos?name=${name}`)
      .then((results) => {
        this.setState({
          videos: results.data,
        });
      });
    this.buildChart();
  }

  updateVideos() {
    if (this.state.currentVideos.length > this.state.videos.length) {
      // send pertinent information to db. ONLY if the information is new.
      const { id } = this.state;
      const videoData = [];
      const currentVideos = this.state.currentVideos.slice();
      currentVideos.forEach((item) => {
        videoData.push({
          channelid: item.snippet.channelId,
          channelname: item.snippet.channelTitle,
          vidid: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          published: item.snippet.publishedAt.slice(0, 10),
          tdefault: item.snippet.thumbnails.default.url,
          medium: item.snippet.thumbnails.medium.url,
          high: item.snippet.thumbnails.high.url,
          tstandard: item.snippet.thumbnails.standard.url,
          tmax: item.snippet.thumbnails.maxres.url,
        });
      });
      axios.put('/api/videos', videoData)
        .then((results) => {
          console.log('results updated');
          // blank state for next checks.
          this.setState({
            currentVideos: [],
            videos: currentVideos,
          });
          this.buildChart();
        });
    } else {
      this.setState({
        currentVideos: [],
      });
    }
    this.setState({
      call: 0,
    });
  }

  buildChart() {
    // builds chart based on videos saved to state.
    const videos = this.state.videos.slice();
    // get cutoff
    const cutOffDate = get18MonthsAgo();
    // filter dates
    const filteredResults = videos.filter((item) => checkValidDate(item, cutOffDate));
    // generate historical data for chart
    const hist = {};
    const chartData = [];
    let date;
    for (let i = filteredResults.length - 1; i > 0; i--) {
      date = filteredResults[i].snippet.publishedAt.slice(0, filteredResults[i].snippet.publishedAt.indexOf('T'));
      if (!hist[date]) {
        hist[date] = 1;
      } else {
        hist[date]++;
      }
    }
    for (const entry in hist) {
      chartData.push({ date: entry, uploads: hist[entry] });
    }
    this.setState({
      history: chartData,
      loading: false,
    });
  }

  getNextVideos(baseURL, nextPageToken) {
    const { maxItems } = this.state;
    const flag = '&pageToken=';
    const indexer = baseURL.indexOf(flag);
    if (indexer !== -1) {
      // if string contains a next page token..
      const newURL = urlFixer(baseURL, indexer, nextPageToken);
      // modify the base url
      axios.get(newURL)
        .then((response) => {
          this.saveKyraVideos(response.data.items);
          if (response.data.nextPageToken) {
            this.getNextVideos(newURL, response.data.nextPageToken);
          }
          if (response.data.nextPageToken === undefined) {
            console.log('sending update query');
            // if there are no movies to request,
            this.updateVideos();
          }
        });
    } else if (this.state.call === 0) {
      // in the case of first successive call
      this.setState({
        call: 1,
      });
      const nextURL = `${baseURL}&pageToken=${nextPageToken}`;
      axios.get(nextURL)
        .then((response) => {
          this.saveKyraVideos(response.data.items);
          if (response.data.nextPageToken) {
            const newPageToken = response.data.nextPageToken;
            this.getNextVideos(nextURL, newPageToken);
          } else {
          // in second call is final call,
            this.updateVideos();
          }
        });
    }
  }

  saveKyraVideos(videos) {
    const newVideos = this.state.currentVideos.concat(videos);
    this.setState({
      currentVideos: newVideos,
    });
  }

  getKyraVideos() {
    const upLoads = 'PLtqawQiwaLpMPXHt763idaRwNkPuCUSMz';
    const part = 'snippet';
    const maxItems = this.state.maxVideos;
    const that = this;
    const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&maxResults=${maxItems}&playlistId=${upLoads}&key=${process.env.API}`;
    // initial call
    axios.get(baseURL)
      .then((response) => {
        console.log(response);
        that.saveKyraVideos(response.data.items);
        if (response.data.nextPageToken) {
          const { nextPageToken } = response.data;
          this.getNextVideos(baseURL, nextPageToken);
        }
        // handle hypothetical instance where there is no second page
        else {
          this.updateVideos();
        }
      })
      .catch((err) => {
        console.log(`error retrieving total videos by playlist:  ${err}`);
      });
  }

  componentDidMount() {
    //initial api request
    this.getKyraVideos();
    /* select how often to update videos in ms
    5 minutes -> 1000*60*5 -> 300000*/
    setInterval(this.getKyraVideos, 300000);
  }

  render() {
    if (this.state.loading === false) {
      return (
        <Container
          fixed
          display="flex"
          style={SContainer}
        >
          <h1>Kyra TV challenge</h1>
          <CChart history={this.state.history} />
          <VideoList videos={this.state.videos} handleClick={this.handleClick} />
        </Container>
      );
    } if (this.state.loading === true) {
      return (<div>loading</div>);
    }
  }
}

export default App;
