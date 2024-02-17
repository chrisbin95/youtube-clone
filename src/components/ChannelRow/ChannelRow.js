import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './ChannelRow.css';

const ChannelRow = ({ image, channel, subs, noOfVideos, description }) => {
  return (
    <div className="flex items-start p-2 sm:flex-col sm:items-start sm:p-4"> {/* Responsive layout for small screens */}
      <Avatar
        className="w-16 h-16 rounded-full mr-10 mb-4 sm:mr-0 sm:mb-0"
        alt={channel}
        src={image}
      />
      <div className="flex-1">
        <h4 className="font-medium"><b>{channel}</b></h4>
        <p className="text-gray-600">{subs} Subscribers • {noOfVideos} Videos</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ChannelRow;
