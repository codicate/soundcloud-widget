import styles from './TrackList.module.scss';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSoundcloud, changeTrack, queryNextPage } from 'app/soundcloudSlice';

import useEventListener from 'hooks/useEventListener';
import SpinnerChase from 'components/SpinnerChase';
import MessageDisplay from 'components/MessageDisplay';
import Track from './Track';


function TrackList() {
  const dispatch = useAppDispatch();
  const { tracks, paginationStatus } = useAppSelector(selectSoundcloud);

  const trackListRef = useRef<HTMLDivElement>(null);

  useEventListener(window, 'scroll', () => {
    const trackListDiv = trackListRef.current;

    if (trackListDiv && paginationStatus === 'idle') {
      const trackListOffset = trackListDiv.offsetTop + trackListDiv.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;

      if (pageOffset >= trackListOffset) {
        dispatch(queryNextPage());
      }
    }
  });

  return (
    <div
      id={styles.trackList}
      ref={trackListRef}
    >
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
      <div id={styles.paginationResult}>
        {(() => {
          switch (paginationStatus) {
            case 'pending':
              return <SpinnerChase />;
            case 'fulfilled':
              return <MessageDisplay
                iconCode='do_not_disturb_on'
                message='You have reached the end'
              />;
            case 'rejected':
              return <MessageDisplay
                id={styles.rejected}
                severity='error'
                iconCode='error'
                message='Something went wrong'
              />;
            default:
              return;
          }
        })()}
      </div>
    </div>
  );
}

export default TrackList;
