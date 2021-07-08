import styles from './TrackList.module.scss';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectTrack, queryNextPage } from 'app/trackSlice';
import { changeTrack } from 'app/playerSlice';

import useEventListener from 'hooks/useEventListener';
import Track from 'views/Track';
import SpinnerChase from 'components/SpinnerChase';
import MessageDisplay from 'components/MessageDisplay';


function TrackList() {
  const dispatch = useAppDispatch();
  const { tracks, paginationStatus } = useAppSelector(selectTrack);

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
    <div id={styles.trackList}>
      <div ref={trackListRef}>
        {
          tracks.map((track, index) => (
            <Track
              key={index}
              track={track}
              play={() => dispatch(changeTrack(index))}
            />
          ))
        }
      </div>
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
