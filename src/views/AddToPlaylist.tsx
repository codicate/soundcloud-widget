import styles from './AddToPlaylist.module.scss';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectPlaylist, createPlaylist, addToPlaylist } from 'app/playlistSlice';

import PlaylistOverview from './PlaylistOverview';


function AddToPlaylist() {
  const dispatch = useAppDispatch();
  const playlists = useAppSelector(selectPlaylist);

  return (
    <div className={styles.addToPlaylist}>
      {(playlists).map((playlist, idx) =>
        <PlaylistOverview
          key={idx}
          playlist={playlist}
        />
      )}
    </div>
  );
}

export default AddToPlaylist;
