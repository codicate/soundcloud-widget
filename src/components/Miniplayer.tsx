import styles from 'components/Miniplayer.module.scss';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectSoundcloud, pauseTrack, prevTrack, nextTrack } from 'app/soundcloudSlice';

import { imgPlaceholder } from 'utils/constants';
import { displayTime } from 'utils/functions';
import Draggie from 'components/Draggie';

export default function MiniPlayer() {
  const dispatch = useAppDispatch();
  const { tracks, currentTrackIndex, isPaused } = useAppSelector(selectSoundcloud);
  const currentTrack = tracks[currentTrackIndex];

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
            {displayTime(player.timestamp)} / {displayTime(info.duration)}
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
