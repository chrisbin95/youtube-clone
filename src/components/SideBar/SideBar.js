import React from 'react';
import SideBarRow from './../SideBarRow/SideBarRow';
import './SideBar.css';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';


const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar__section'>
                <SideBarRow selected Icon={HomeIcon} title='Home' />
                <SideBarRow Icon={WhatshotIcon} title='Trending' />
                <SideBarRow Icon={SubscriptionsIcon} title='Subscriptions' />
            </div>
            
            <div className='sidebar__divider'></div>
            
            <div className='sidebar__section'>
                <div className='sidebar__label'>Your Library</div>
                <SideBarRow Icon={VideoLibraryIcon} title='Library' />
                <SideBarRow Icon={HistoryIcon} title='History' />
                <SideBarRow Icon={OndemandVideoIcon} title='Your videos' />
            </div>
            
            <div className='sidebar__divider'></div>
            
            <div className='sidebar__section'>
                <div className='sidebar__label'>Saved</div>
                <SideBarRow Icon={WatchLaterIcon} title='Watch later' />
                <SideBarRow Icon={ThumbUpIcon} title='Liked videos' />
            </div>
        </div>
    )
}

export default SideBar;
