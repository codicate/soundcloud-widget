import React, { useState, useEffect, createRef } from 'react';
import './App.css';

import SoundCloudAPI from './SCAPI';
import Track from './components/track';

function Searchbar(props) {
  const [input, setInput] = useState('');
  const searchbar = createRef();

  return (
    <div id='searchBar'>
      <input
        autoFocus
        type='text'
        placeholder='Search'
        ref={searchbar}
        value={input}
        onChange={
          e => setInput(e.target.value)
        }
        onKeyUp={
          e => e.key === 'Enter' && props.returnInput(e.target.value)
        }
      />
      <div id='clearDiv'>
        <span
          id='clear'
          className='material-icons btn'
          onClick={
            () => setInput('') || searchbar.current.focus()
          }
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

  const [status, setStatus] = useState('coldStart');
  const fetchTracks = (input) => {
    setStatus('fetching');
    SoundCloudAPI.getTracks(input, data => {
      setStatus('fetched');
      setTracks(data);
    });
  };

  const renderResult = () => {
    switch (status) {
      case 'fetching':
        return <div id='loading'>Loading</div>;
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
  </>;
};

export default App;
