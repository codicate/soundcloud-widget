import React, { useState, useEffect } from 'react';

export default function Card(props) {
  return (
    <div className='card'>
      <img src={props.imgURL} alt={props.title + ' cover'} />
      <p className='title'>
        {props.title}
      </p>
      <p className='artist'>
        {props.artist}
      </p>
      <button>
        <span className='material-icons'>
          add_box
        </span>
        <span>Add to Playlist</span>
      </button>
    </div>
  );
}
