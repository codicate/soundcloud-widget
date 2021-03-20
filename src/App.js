import React, { useState, useEffect } from 'react';
import './App.css';

import SoundCloudAPI from './SCAPI';
import Card from './components/card';

function App() {
  const API_ID = 'cd9be64eeb32d1741c17cb39e41d254d';

  useEffect(() => {
    SoundCloudAPI.init(API_ID);
  }, []);

  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  const fetchTracks = input => SoundCloudAPI.getTrack(input,
    data => setTracks(data)
  );

  return <>
    <div id='searchBar'>
      <input
        type='text'
        placeholder='Search'
        onKeyUp={
          e => e.key === 'Enter' && fetchTracks(e.target.value)
        }
      />
    </div>
    <div id='searchResults'>
      {tracks.map((track, index) => (
        <Card
          key={index}
          title={track.title}
          artist={track.user.username}
          imgURL={
            track.artwork_url?.replace(/large(?=.jpg)/i, 'small')
          }
        ></Card>
      ))}

    </div>
  </>;
};

export default App;
