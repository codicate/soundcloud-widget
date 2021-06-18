import styles from 'components/Miniplayer.module.scss';
import { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectSoundcloud, pauseTrack, prevTrack, nextTrack } from 'app/soundcloudSlice';

import { imgPlaceholder } from 'utils/constants';
import { millisecond2second, displayTime } from 'utils/functions';
import Draggie from 'components/Draggie';

export default function MiniPlayer() {
  const dispatch = useAppDispatch();
  const { player, tracks, currentTrackIndex, isPaused } = useAppSelector(selectSoundcloud);
  const currentTrack = tracks[currentTrackIndex];

  const [timestamp, setTimestamp] = useState(0);
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    (async () => {
      if (!player) return;

      await player.play();

      setDuration(player.getDuration());
      setTimestamp(0);
    })();
  }, [dispatch, player]);


  useEffect(() => {
    if (!player) return;

    const timestampTimer = setInterval(() => {
      const newTime = player.currentTime();
      if (newTime >= duration) dispatch(nextTrack());
      else setTimestamp(newTime);
    }, 1000);

    return () => clearInterval(timestampTimer);
  }, [dispatch, player, duration]);

  return (
    <Draggie id='miniplayer'>
      <img
        className='cover'
        alt={currentTrack.title + ' cover'}
        src={currentTrack.artwork_url?.replace(/large(?=.jpg)/i, 't500x500') || imgPlaceholder}
      />
      <div id='overlay'>
        <div className='info'>
          <p className='title'>
            {currentTrack.title}
          </p>
          <p className='artist'>
            {currentTrack.user.username}
          </p>
          <p className='timestamp'>
            {displayTime(millisecond2second(timestamp))} / {displayTime(millisecond2second(duration))}
          </p>
        </div>
        <div className='control'>
          <span
            id='previous'
            className='material-icons btn'
            onClick={() => dispatch(prevTrack())}
          >
            skip_previous
          </span>
          <span
            id='play'
            className='material-icons btn'
            onClick={() => dispatch(pauseTrack(!isPaused))}
          >
            {isPaused ? 'play_arrow' : 'pause'}
          </span>
          <span
            id='next'
            className='material-icons btn'
            onClick={() => dispatch(nextTrack())}
          >
            skip_next
          </span>
        </div>
      </div>
    </Draggie>
  );
}
