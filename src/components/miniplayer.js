import { useRef } from "react";
import useDrag from '../hooks/useDrag';

const imgPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

function displayTime(seconds) {
  const format = val => `0${Math.floor(val)}`.slice(-2);
  return [seconds % 3600 / 60, seconds % 60].map(format).join(':');
}

export default function MiniPlayer({ info, ...props }) {
  const miniplayer = useRef();
  useDrag(miniplayer);

  return (
    <div id='miniplayer' ref={miniplayer}>
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
            onClick={() => props.skip(false)}
          >
            skip_previous
          </span>
          <span
            id='play'
            className='material-icons btn'
            onClick={props.onPause}
          >
            {props.pause ? 'play_arrow' : 'pause'}
          </span>
          <span
            id='next'
            className='material-icons btn'
            onClick={() => props.skip(true)}
          >
            skip_next
          </span>
        </div>
      </div>
    </div>
  );
}
