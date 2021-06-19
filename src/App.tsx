import 'App.scss';
import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSoundcloud, playTrack } from 'app/soundcloudSlice';

import Spinner from 'components/Spinner';
import Searchbar from 'views/Searchbar';
import MiniPlayer from 'views/Miniplayer';
import TrackList from 'views/TrackList';

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
            return (tracks.length === 0)
              ? <div id='noResult'>No Result :(</div>
              : <TrackList />;
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
