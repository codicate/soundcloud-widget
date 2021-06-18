import 'App.scss';
import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSoundcloud, playTrack, changeTrack } from 'app/soundcloudSlice';

import Searchbar from 'components/Searchbar';
import Spinner from 'components/Spinner';
import MiniPlayer from 'components/Miniplayer';
import Track from 'components/Track';

function App() {
  const dispatch = useAppDispatch();
  const { status, tracks, currentTrackIndex } = useAppSelector(selectSoundcloud);

  useEffect(() => {
    (currentTrackIndex !== -1) && 
      dispatch(playTrack(tracks[currentTrackIndex].id));
  }, [currentTrackIndex, dispatch, tracks]);

  return <>
    <Searchbar />
    <div id='searchResults'>
      {(() => {
        switch (status) {
          case 'pending':
            return <Spinner />;
          case 'fulfilled':
            return tracks.length === 0
              ? <div id='noResult'>No Result :(</div>
              : tracks.map((track, index) => (
                <Track
                  key={index}
                  info={{
                    title: track.title,
                    artist: track.user.username,
                    imgURL: track.artwork_url?.replace(/large(?=.jpg)/i, 'small')
                  }}
                  play={() => dispatch(changeTrack(index))}
                />
              ));
          case 'rejected':
            return <div id='noResult'>Something went wrong :(</div>;
          default:
            return;
        }
      })()}
    </div>
    {(currentTrackIndex !== -1) && (
      <MiniPlayer />
    )}
  </>;
};

export default App;
