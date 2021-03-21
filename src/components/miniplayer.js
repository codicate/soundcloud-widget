import React, { useState, useEffect, useRef } from 'react';
import SoundCloudAPI from '../SCAPI';

const imgPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default function MiniPlayer(props) {
  const player = useRef();
  useEffect(() => {
    (async () => {
      player.current = await SoundCloudAPI.playTrack(props.trackId);
      player.current.play()
    })();
  }, [props.trackId]);

  const [pause, setPause] = useState(false);
  useEffect(() => {

    player.current && (
      pause ? player.current.pause() : player.current.play()
    );
  }, [pause]);

  const [hover, setHover] = useState(false);

  return (
    <div
      id='miniplayer'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(true)}
    >
      <img
        className='cover'
        alt={props.title + ' cover'}
        src={props.imgURL || imgPlaceholder}
      />
      {hover && (
        <div id='overlay'>
          <div className='info'>
            <p className='title'>
              {props.title}
            </p>
            <p className='artist'>
              {props.artist}
            </p>
          </div>
          <div className='control'>
            <span>

            </span>
            <span
              id='play'
              className='material-icons btn'
              onClick={() => setPause(pause => !pause)}
            >
              {pause ? 'play_arrow' : 'pause'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
