import 'App.scss';
import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSoundcloud, playTrack } from 'app/soundcloudSlice';

import Searchbar from 'components/Searchbar';
import Spinner from 'components/Spinner';
import MiniPlayer from 'components/Miniplayer';
import TrackList from 'components/TrackList';

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
