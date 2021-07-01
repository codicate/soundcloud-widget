import styles from './PlaylistOverview.module.scss';

import { Playlist } from 'app/playlistSlice';

import TrackCover from 'views/TrackCover';
import Button from 'components/Button';


function PlaylistOverview({
  playlist,
  clickHandler
}: {
  playlist: Playlist;
  clickHandler?: () => void;
}) {

  return (
    <Button
      className={styles.playlistOverview}
      onClick={clickHandler}
    >
      <div className={styles.covers}>
        {playlist.tracks.slice(0, 4).map((track, idx) =>
          <TrackCover
            key={idx}
            track={track}
          />
        )}
      </div>
      <div className={styles.playlistInfo}>
        <p>
          {playlist.name}
        </p>
        <p>
          {playlist.tracks.length} {(playlist.tracks.length > 1) ? 'songs' : 'song'}
        </p>
      </div>
    </Button>
  );
}

export default PlaylistOverview;
