import React, { useState, useEffect, createRef } from 'react';
import './App.css';

import SoundCloudAPI from './SCAPI';
import Searchbar from './components/searchbar';
import Spinner from './components/spinner';
import MiniPlayer from './components/miniplayer';
import Track from './components/track';

function App() {
  const API_ID = 'cd9be64eeb32d1741c17cb39e41d254d';

  useEffect(() => {
    SoundCloudAPI.init(API_ID);
  }, []);

  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  const [status, setStatus] = useState('coldStart');
  const fetchTracks = (input) => {
    setStatus('fetching');
    SoundCloudAPI.getTracks(input, data => {
      setStatus('fetched');
      setTracks(data);
    });
  };

  const [currentTrack, setCurrentTrack] = useState({});

  const renderResult = () => {
    switch (status) {
      case 'fetching':
        return <Spinner />;
      case 'fetched':
        return tracks.length === 0
          ? <div id='noResult'>No Result :(</div>
          : tracks.map((track, index) => (
            <Track
              key={index}
              title={track.title}
              artist={track.user.username}
              imgURL={
                track.artwork_url?.replace(/large(?=.jpg)/i, 'small')
              }
              play={() => setCurrentTrack(tracks[index])}
            ></Track>
          ));
      default:
        return;
    }
  };

  return <>
    <Searchbar returnInput={fetchTracks} />
    <div id='searchResults'>
      {renderResult()}
    </div>
    {!(currentTrack && Object.keys(currentTrack).length === 0) && (
      <MiniPlayer
        trackId={currentTrack.id}
        title={currentTrack.title}
        artist={currentTrack.user.username}
        imgURL={
          currentTrack.artwork_url?.replace(/large(?=.jpg)/i, 't500x500')
        }
      />
    )}
  </>;
};

export default App;
