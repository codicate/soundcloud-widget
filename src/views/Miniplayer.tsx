import styles from './Miniplayer.module.scss';
import { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectPlayer, isPlayerPaused, selectCurrentTrack, pauseTrack, seekTrack, skipTrack } from 'app/playerSlice';


import { millisecond2second, displayTime } from 'utils/functions';
import { imgPlaceholder } from 'utils/constants';

import Draggie from 'components/Draggie';
import Button from 'components/Button';


export default function MiniPlayer() {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector(selectCurrentTrack);
  const { player } = useAppSelector(selectPlayer);
  const isPaused = useAppSelector(isPlayerPaused);

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
      if (newTime >= duration) dispatch(skipTrack('next'));
      else setTimestamp(newTime);
    }, 1000);

    return () => clearInterval(timestampTimer);
  }, [dispatch, player, duration]);

  return (currentTrack) ? (
    <Draggie controlledMode id={styles.miniplayer}>
      <img
        className={styles.cover}
        alt={currentTrack.title + ' cover'}
        src={currentTrack.artwork_url?.replace(/large(?=.jpg)/i, 't500x500') || imgPlaceholder}
      />

      <div id={styles.overlay}>
        <Button
          id={styles.draggie}
          className='material-icons draggie'
        >
          drag_indicator
        </Button>
        <Button
          id={styles.expand}
          className='material-icons'
        >
          launch
        </Button>

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
            id={styles.rewind}
            className='material-icons'
            onClick={() => dispatch(seekTrack(-10))}
          >
            fast_rewind
          </Button>
          <Button
            id={styles.previous}
            className='material-icons'
            onClick={() => dispatch(skipTrack('prev'))}
          >
            skip_previous
          </Button>
          <Button
            id={styles.play}
            className='material-icons'
            onClick={() => dispatch(pauseTrack())}
          >
            {
              (isPaused)
                ? 'pause'
                : 'play_arrow'
            }
          </Button>
          <Button
            id={styles.next}
            className='material-icons'
            onClick={() => dispatch(skipTrack('next'))}
          >
            skip_next
          </Button>
          <Button
            id={styles.forward}
            className='material-icons'
            onClick={() => dispatch(seekTrack(10))}
          >
            fast_forward
          </Button>
        </div>
      </div>

      <progress
        id={styles.trackProgress}
        max={duration}
        value={timestamp}
      />
    </Draggie >
  ) : (<> no</>);
}
