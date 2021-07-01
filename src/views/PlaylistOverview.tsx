import styles from './PlaylistOverview.module.scss';

import { SoundcloudTrack } from 'soundcloud';
import { useDispatch } from 'react-redux';
import { Playlist, addToPlaylist } from 'app/playlistSlice';

import TrackCover from 'views/TrackCover';
import Button from 'components/Button';


function PlaylistOverview({
  playlist,
  track
}: {
  playlist: Playlist;
  track: SoundcloudTrack;
}) {
  const dispatch = useDispatch();

  return (
    <Button
      className={styles.PlaylistOverview}
      onClick={() => dispatch(addToPlaylist({
        name: playlist.name,
        track
      }))}
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
