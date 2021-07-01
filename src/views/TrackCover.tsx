import styles from './TrackCover.module.scss';

import { SoundcloudTrack } from 'soundcloud';
import { imgPlaceholder } from 'utils/constants';


function TrackCover({
  track
}: {
  track: SoundcloudTrack;
}) {
  return (
    <div className={styles.cover}>
      <img
        alt={track.title + ' cover'}
        src={
          track.artwork_url?.replace(/large(?=.jpg)/i, 'small')
          || imgPlaceholder
        }
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.src = imgPlaceholder;
        }}
      />
    </div>
  );
}

export default TrackCover;
