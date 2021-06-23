import styles from './PlaylistOverview.module.scss';

import { Playlist } from 'app/playlistSlice';

import TrackCover from 'views/TrackCover';


function PlaylistOverview({
  playlist
}: {
  playlist: Playlist;
}) {
  return (
    <div className={styles.PlaylistOverview}>
      <div>
        {playlist.tracks.slice(0, 4).map((track, idx) =>
          <TrackCover
            key={idx}
            track={track}
          />
        )}
      </div>
      <p>
        {playlist.name}
      </p>
      <p>
        {playlist.tracks.length} {(playlist.tracks.length > 1) ? 'songs' : 'song'}
      </p>
    </div>
  );
}

export default PlaylistOverview;
