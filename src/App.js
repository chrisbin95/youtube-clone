import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import RecommendedVideos from './components/RecommendedVideos/RecommendedVideos';
import SearchPage from './components/SearchPage/SearchPage';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function MainContent({ children }) {
  return (
    <div className="app__mainpage">
      <SideBar />
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path='/video/:videoId'>
            <MainContent>
              <VideoPlayer />
            </MainContent>
          </Route>
          <Route path='/search/:searchQuery'>
            <MainContent>
              <SearchPage />
            </MainContent>
          </Route>
          <Route path='/'>
            <MainContent>
              <RecommendedVideos />
            </MainContent>
          </Route>
          {/* 404 Page */}
          <Route path='*'>
            <MainContent>
              <h1>404 - Not Found</h1>
            </MainContent>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
