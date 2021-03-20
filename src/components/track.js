import React, { useState, useEffect } from 'react';

export default function Card(props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className='track'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={props.imgURL} alt={props.title + ' cover'} />
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
          <span id='add' className='material-icons btn'>
            add_box
          </span>
        </div>
      )}
    </div>
  );
}
