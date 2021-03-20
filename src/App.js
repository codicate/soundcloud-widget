import React, { useState, useEffect } from 'react';
import './App.css';

import SoundCloudAPI from './SCAPI';
import Track from './components/track';

function Searchbar(props) {
  const [input, setInput] = useState('');
  const [focus, setFocus] = useState(true);

  return (
    <div id='searchBar'>
      <input
        autoFocus={focus}
        type='text'
        placeholder='Search'
        value={input}
        onFocus={console.log('in focus')}
        onBlur={console.log('lost focus')}
        onChange={e => setInput(e.target.value)}
        onKeyUp={
          e => e.key === 'Enter' && props.returnInput(e.target.value)
        }
      />
      <div>
        <span id='clear' className='material-icons btn'
          onClick={() => { setInput('')}}
        >
          clear
        </span>
      </div>
    </div>
  );
}

function App() {
  const API_ID = 'cd9be64eeb32d1741c17cb39e41d254d';

  useEffect(() => {
    SoundCloudAPI.init(API_ID);
  }, []);

  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  const fetchTracks = (input) => {
    SoundCloudAPI.getTracks(input, data => setTracks(data));
  };

  return <>
    <Searchbar returnInput={fetchTracks} />
    <div id='searchResults'>
      {tracks.map((track, index) => (
        <Track
          key={index}
          title={track.title}
          artist={track.user.username}
          imgURL={
            track.artwork_url?.replace(/large(?=.jpg)/i, 'small')
          }
        ></Track>
      ))}
    </div>
  </>;
};

export default App;
