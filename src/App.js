import React, { useState, useEffect, useRef } from 'react';
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

  const [currentTrack, setCurrentTrack] = useState(undefined);
  const player = useRef();
  useEffect(() => {
    currentTrack !== undefined && (async () => {
      console.log(currentTrack);
      player.current = await SoundCloudAPI.getPlayer(tracks[currentTrack].id);
      console.log(player.current);
      player.current.play();
    })();
  }, [tracks, currentTrack]);

  const [pause, setPause] = useState(false);
  useEffect(() => {
    player.current && (
      pause ? player.current.pause() : player.current.play()
    );
  }, [pause]);

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
              play={() => setCurrentTrack(index)}
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
    {currentTrack !== undefined && (
      <MiniPlayer
        trackId={tracks[currentTrack].id}
        title={tracks[currentTrack].title}
        artist={tracks[currentTrack].user.username}
        imgURL={
          tracks[currentTrack].artwork_url?.replace(/large(?=.jpg)/i, 't500x500')
        }
        pause={pause}
        onPause={() => setPause(pause => !pause)}
        skip={next => setCurrentTrack(
          prevTrack => {
            const nextTrack = next ? prevTrack + 1 : prevTrack - 1;
            return tracks[nextTrack] ? nextTrack : prevTrack;
          }
        )}
      />
    )}
  </>;
};

export default App;
