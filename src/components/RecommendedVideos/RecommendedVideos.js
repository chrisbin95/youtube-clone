import React, {useEffect, useState} from 'react';
import VideoCard from './../VideoCard/VideoCard';
import './RecommendedVideos.css';
import axios from 'axios';
import {DateTime} from 'luxon';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';


const RecommendedVideos = () => {

    const [videoCards, setVideoCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      axios
          .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=9&regionCode=IN&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
          .then(response => {
              createVideoCards(response.data.items);
          })
          .catch(error => {
              console.error(error);
              setIsError(true);
              setIsLoading(false);
          })
    }, [])

    async function createVideoCards(videoItems) {
      let newVideoCards = [];
      for (const video of videoItems) {
        const videoId = video.id;
        const snippet = video.snippet;
        const channelId = snippet.channelId;
        const response = await axios
                              .get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        const channelImage = response.data.items[0].snippet.thumbnails.medium.url;

        const title = snippet.title;
        const image = snippet.thumbnails.medium.url;
        const views = video.statistics.viewCount;
        const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
        const channel = snippet.channelTitle;

        newVideoCards.push({
          videoId,
          image,
          title,
          channel,
          views,
          timestamp,
          channelImage
        });
      };
      setVideoCards(newVideoCards);
      setIsLoading(false);
    }

    if (isError) {
      return (
          <Alert severity="error" className='loading'>
              <strong>Error:</strong> Something went wrong! Please try again later.
          </Alert>
      );
  }

  return (
      <div className='recommendedvideos'>
          {isLoading && (
              <div className='loading text-center'>
                  <CircularProgress color='secondary' />
                  <p>Loading recommended videos...</p>
              </div>
          )}
          <div className="recommendedvideos__videos">
              {videoCards.map(item => (
                  <Link key={item.videoId} to={`/video/${item.videoId}`}>
                      <VideoCard
                          title={item.title}
                          image={item.image}
                          views={item.views}
                          timestamp={item.timestamp}
                          channel={item.channel}
                          channelImage={item.channelImage}
                      />
                  </Link>
              ))}
          </div>
      </div>
  )
}

export default RecommendedVideos;
