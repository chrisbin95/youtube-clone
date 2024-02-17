import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Video from './../Video/Video';
import './VideoPlayer.css';
import RecommendedVideos from '../RecommendedVideos/RecommendedVideos';
import VideoInfo from '../VideoInfo/VideoInfo';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import SideBar from '../SideBar/SideBar';

const VideoPlayer = () => {
    let { videoId } = useParams();

    const [videoInfo, setVideoInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setVideoInfo({});
        setIsLoading(true);
        axios
            .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
            .then(response => {
                createVideoInfo(response.data['items'][0]);
                setIsError(false);
            })
            .catch(error => {
                console.error(error);
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [videoId]);

    async function createVideoInfo(video) {
        const snippet = video.snippet;
        const stats = video.statistics;
        const channelId = snippet.channelId;
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);

            const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
            const subs = response.data.items[0].statistics.subscriberCount;
            const publishedDate = new Date(snippet.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
            const title = snippet.title;
            const description = snippet.description;
            const channelTitle = snippet.channelTitle;
            const viewCount = stats.viewCount;
            const likeCount = stats.likeCount;
            const dislikeCount = stats.dislikeCount;

            setVideoInfo({
                title,
                description,
                publishedDate,
                channelTitle,
                channelImage,
                viewCount,
                likeCount,
                dislikeCount,
                subs,
            });
        } catch (error) {
            console.error(error);
            setIsError(true);
        }
    }

    if (isError) {
        return (
            <Alert severity="error" className='loading'>
                Error: Something went wrong! Please try again later.
            </Alert>
        );
    }

    return (
        <>
        <div className='videoplayer'>
            <div className='videoplayer__videodetails'>
                <div className='videoplayer__video'>
                    {isLoading ? (
                        <div className='loading'>
                            <CircularProgress color='secondary' />
                            <p>Loading video details...</p>
                        </div>
                    ) : (
                        <div className='loading'>
                        <Video videoId={videoId} />
                        </div>
                    )}
                </div>
                <div className='videoplayer__videoinfo'>
                    {!isLoading && <VideoInfo {...videoInfo} />}
                </div>
            </div>
            <div className='videoplayer__suggested'>
                <RecommendedVideos />
            </div>
        </div>
        </>
    );
};

export default VideoPlayer;
