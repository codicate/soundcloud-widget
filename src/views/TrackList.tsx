import styles from './TrackList.module.scss';
import React from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSoundcloud, changeTrack } from 'app/soundcloudSlice';

import Track from './Track';


function TrackList() {
  const dispatch = useAppDispatch();
  const { tracks } = useAppSelector(selectSoundcloud);

  return (
    <div id={styles.trackList}>
      {
        tracks.map((track, index) => (
          <Track
            key={index}
            info={{
              title: track.title,
              artist: track.user.username,
              imgURL: track.artwork_url?.replace(/large(?=.jpg)/i, 'small')
            }}
            play={() => dispatch(changeTrack(index))}
          />
        ))
      }
    </div>
  );
}

export default TrackList;
