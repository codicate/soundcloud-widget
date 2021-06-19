import styles from './TrackList.module.scss';
import React from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSoundcloud, changeTrack, searchForTracks } from 'app/soundcloudSlice';

import Button from 'components/Button';
import Track from './Track';


function TrackList() {
  const dispatch = useAppDispatch();
  const { tracks, nextPageQuery } = useAppSelector(selectSoundcloud);

  return (
    <div id={styles.trackList}>
      {
        tracks.map((track, index) => (
          <Track
            key={index}
            info={{
              title: track.title,
              artist: track.user.username,
              artworkURL: track.artwork_url?.replace(/large(?=.jpg)/i, 'small')
            }}
            play={() => dispatch(changeTrack(index))}
          />
        ))
      }

      {(nextPageQuery) && (
        <Button 
          styledAs='bigWhite'
        onClick={() => {
          dispatch(searchForTracks({ nextPageQuery }));
        }}>
          Load More
        </Button>
      )
      }
    </div>
  );
}

export default TrackList;
