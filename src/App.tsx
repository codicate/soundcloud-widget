import styles from './App.module.scss';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSoundcloud, playTrack } from 'app/soundcloudSlice';

import SpinnerRect from 'components/SpinnerRect';
import MessageDisplay from 'components/MessageDisplay';

import Searchbar from 'views/Searchbar';
import Suggestions from 'views/Suggestions';
import MiniPlayer from 'views/Miniplayer';
import TrackList from 'views/TrackList';

function App() {
  const dispatch = useAppDispatch();
  const { searchStatus, tracks, currentTrack } = useAppSelector(selectSoundcloud);

  useEffect(() => {
    (currentTrack) &&
      dispatch(playTrack(currentTrack.id));
  }, [currentTrack, dispatch]);

  return <>
    <Searchbar />
    <main id={styles.main}>
      {(() => {
        switch (searchStatus) {
          case 'idle':
            return <Suggestions />;

          case 'pending':
            return <SpinnerRect />;

          case 'fulfilled':
            return (tracks.length === 0)
              ? <MessageDisplay
                iconCode='sentiment_dissatisfied'
                message='No result'
              />
              : <TrackList />;

          case 'rejected':
            return <MessageDisplay
              severity='error'
              iconCode='error'
              message='Something went wrong'
            />;
            
          default:
            return;
        }
      })()}
    </main>

    <MiniPlayer />
  </>;
};

export default App;
