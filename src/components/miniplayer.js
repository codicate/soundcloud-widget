import React, { useState, useEffect } from 'react';
import SoundCloudAPI from '../SCAPI';

const imgPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default function MiniPlayer(props) {
  const [hover, setHover] = useState(false);

  useEffect(() => {
    SoundCloudAPI.playTrack(props.trackId)
  }, [props.trackId])

  return (
    <div
      id='miniplayer'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        alt={props.title + ' cover'}
        src={props.imgURL || imgPlaceholder}
      />
      <div className='info'>
        <p className='title'>
          {props.title}
        </p>
        <p className='artist'>
          {props.artist}
        </p>
      </div>
      {hover && (
        <div className='control'>
          <span
            id='add'
            className='material-icons btn'
            onClick={() => props.play()}
          >
            add_box
          </span>
        </div>
      )}
    </div>
  );
}
