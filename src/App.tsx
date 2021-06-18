import 'App.scss';
import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSoundcloud, playTrack, pauseTrack, changeTrack, nextTrack } from 'app/soundcloudSlice';

import Searchbar from 'components/Searchbar';
import Spinner from 'components/Spinner';
import MiniPlayer from 'components/Miniplayer';
import Track from 'components/Track';

const milliseconds2seconds = (milliseconds: number) => {
  return Math.floor(milliseconds / 1000);
};

function App() {
  const dispatch = useAppDispatch();
  const { status, tracks, currentTrackIndex, player } = useAppSelector(selectSoundcloud);

  const [duration, setDuration] = useState(1);

  useEffect(() => {
    (currentTrackIndex !== -1) && 
      dispatch(playTrack(tracks[currentTrackIndex].id));
  }, [currentTrackIndex, dispatch, tracks]);

  useEffect(() => {(async () => {
    console.log(player);
    if (!player) return;

    await player.play();

    setDuration(
      milliseconds2seconds(await player.getDuration())
    );
  })()}, [player])

  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const timestampTimer = setInterval(async () => {
      player && setTimestamp(
        milliseconds2seconds(await player.currentTime())
      );
    }, 1000);

    return () => clearInterval(timestampTimer);
  }, [player]);

  if ( timestamp === duration) {
    console.log(timestamp, duration);
    dispatch(nextTrack);
  }
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
      <MiniPlayer
        info={{
          title: tracks[currentTrackIndex].title,
          artist: tracks[currentTrackIndex].user.username,
          timestamp: timestamp,
          duration: duration,
          imgURL: tracks[currentTrackIndex].artwork_url?.replace(/large(?=.jpg)/i, 't500x500')
        }}
      />
    )}
  </>;
};

export default App;
