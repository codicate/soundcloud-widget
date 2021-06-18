import styles from 'components/Miniplayer.module.scss';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectSoundcloud, pauseTrack, prevTrack, nextTrack } from 'app/soundcloudSlice';

import Draggie from 'components/Draggie';

const imgPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const displayTime = (seconds: number) => {
  return [seconds % 3600 / 60, seconds % 60]
    .map((val: number) =>
      `0${Math.floor(val)}`.slice(-2)
    )
    .join(':');
};

export default function MiniPlayer(
  { info, ...props }: {
    info: {
      title: string,
      artist: string,
      imgURL: string,
      timestamp: number,
      duration: number;
    };
  }
) {
  const dispatch = useAppDispatch();
  const { isPaused } = useAppSelector(selectSoundcloud);
  return (
    <Draggie id='miniplayer'>
      <img
        className='cover'
        alt={info.title + ' cover'}
        src={info.imgURL || imgPlaceholder}
      />
      <div id='overlay'>
        <div className='info'>
          <p className='title'>
            {info.title}
          </p>
          <p className='artist'>
            {info.artist}
          </p>
          <p className='timestamp'>
            {displayTime(info.timestamp)} / {displayTime(info.duration)}
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
