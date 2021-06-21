import styles from './Miniplayer.module.scss';
import { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectSoundcloud, pauseTrack, prevTrack, nextTrack } from 'app/soundcloudSlice';

import { millisecond2second, displayTime } from 'utils/functions';
import { imgPlaceholder } from 'utils/constants';

import Draggie from 'components/Draggie';
import Button from 'components/Button';


export default function MiniPlayer() {
  const dispatch = useAppDispatch();
  const { player, currentTrack, isPaused } = useAppSelector(selectSoundcloud);

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

  return (currentTrack) && (
    <Draggie controlledMode id={styles.miniplayer}>
      <img
        className={styles.cover}
        alt={currentTrack.title + ' cover'}
        src={currentTrack.artwork_url?.replace(/large(?=.jpg)/i, 't500x500') || imgPlaceholder}
      />

      <div id={styles.overlay}>
        <div className={styles.draggie + ' material-icons draggie'}>
          drag_indicator
        </div>
        <div className={styles.info}>
          <p className={styles.title}>
            {currentTrack.title}
          </p>
          <p className={styles.artist}>
            {currentTrack.user.username}
          </p>
          <p className={styles.timestamp}>
            {displayTime(millisecond2second(timestamp))} / {displayTime(millisecond2second(duration))}
          </p>
        </div>

        <div className={styles.control}>
          <Button
            id={styles.previous}
            className='material-icons'
            onClick={() => dispatch(prevTrack())}
          >
            skip_previous
          </Button>
          <Button
            id={styles.play}
            className='material-icons'
            onClick={() => dispatch(pauseTrack(!isPaused))}
          >
            {
              (player?.isPlaying())
                ? 'pause'
                : 'play_arrow'
            }
          </Button>
          <Button
            id={styles.next}
            className='material-icons'
            onClick={() => dispatch(nextTrack())}
          >
            skip_next
          </Button>
        </div>
      </div>
    </Draggie>
  );
}
