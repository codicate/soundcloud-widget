import styles from './App.module.scss';
import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSoundcloud, playTrack } from 'app/soundcloudSlice';

import SpinnerRect from 'components/SpinnerRect';
import MessageDisplay from 'components/MessageDisplay';

import Searchbar from 'views/Searchbar';
import MiniPlayer from 'views/Miniplayer';
import TrackList from 'views/TrackList';

function App() {
  const dispatch = useAppDispatch();
  const { searchStatus, tracks, currentTrackIndex } = useAppSelector(selectSoundcloud);

  useEffect(() => {
    (currentTrackIndex !== -1) &&
      dispatch(playTrack(tracks[currentTrackIndex].id));
  }, [currentTrackIndex, dispatch, tracks]);

  return <>
    <Searchbar />
    <main id={styles.main}>
      {(() => {
        switch (searchStatus) {
          case 'pending':
            return <SpinnerRect />;
          case 'fulfilled':
            return (tracks.length === 0)
              ? <MessageDisplay
                iconCode='sentiment_dissatisfied'
                message='No Result'
              />
              : <TrackList />;
          case 'rejected':
            return <MessageDisplay
              severity='error'
              iconCode='error'
              message='Something Went Wrong'
            />;
          default:
            return;
        }
      })()}
    </main>
    {(currentTrackIndex !== -1) && (
      <MiniPlayer />
    )}
  </>;
};

export default App;
