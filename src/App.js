import React, { useState, useEffect } from 'react';
import './App.css';
import { Puff } from 'react-loader-spinner'; // Import the specific loader component you want to use
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay with setTimeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
    
      {loading ? (
        <div className="app-container">
        <div className="loader-container text-center">
        <Puff // Use the specific loader component
          color="red"
          height={100}
          width={200}
          timeout={3000}
        />
        <p>Loading...</p>
        </div>
        </div>
      ) : (
        <div className="App">
          <Router>
            <Header />
            <Switch>
              <Route path='/video/:videoId'>
                <VideoPlayer />
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
      )}
    </div>
  );
}

export default App;