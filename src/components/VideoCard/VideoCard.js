import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './VideoCard.css';

const VideoCard = ({image, title, channel, views, timestamp, channelImage}) => {
    return (
        <div className='videocard'>
          <div className='videocard_image'>
          <img className='videocard__image' src={image} alt='' />
          </div>
          <div className="videocard__info">
            <Avatar 
              className='videocard__avatar' 
              alt={channel} 
              src={channelImage} 
            />
            <div className="videocard__text">
              <h4>{title}</h4>
              <p>{channel}</p>
              <p>{views} views • {timestamp}</p>
            </div> 
          </div>
        </div>
    )
}

export default VideoCard;
