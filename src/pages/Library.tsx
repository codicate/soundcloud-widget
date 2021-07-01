import styles from './Library.module.scss';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectPlaylist, createPlaylist } from 'app/playlistSlice';

import PlaylistOverview from 'views/PlaylistOverview';


function Library() {
  const dispatch = useAppDispatch();
  const playlists = useAppSelector(selectPlaylist);

  return (
    <div>
      <div className={styles.playlists}>
        {(playlists).map((playlist, idx) =>
          <PlaylistOverview
            key={idx}
            playlist={playlist}
            clickHandler={() => { }}
          />
        )}
      </div>
    </div>
  );
}

export default Library;
