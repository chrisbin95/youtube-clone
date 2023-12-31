import React from 'react';
import './VideoRow.css';

const VideoRow = ({ views, description, timestamp, channel, title, image }) => {
  return (
    <div className='container'>
    <div className='videorow p-4 sm:p-2 md:p-4 lg:p-6 xl:p-8'>
      <img src={image} alt="" className="w-full h-auto mb-4 sm:mb-0 sm:w-1/3 lg:w-1/4 xl:w-1/5" />
      </div>
      <div className="videorow__text flex flex-col justify-between sm:ml-2">
        <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-2">{title}</h3>
        <p className='videorow__headline text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-2'>
          {channel} • {views} views • {timestamp}
        </p>
        <p className='videorow__description text-sm sm:text-base lg:text-lg xl:text-xl'>
          {description}
        </p>
      </div>
    </div>
  );
}

export default VideoRow;

