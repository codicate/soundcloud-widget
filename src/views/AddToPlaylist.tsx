import styles from './AddToPlaylist.module.scss';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectPlaylist, createPlaylist, addToPlaylist } from 'app/playlistSlice';

import PlaylistOverview from 'views/PlaylistOverview';
import Button from 'components/Button';


function AddToPlaylist() {
  const dispatch = useAppDispatch();
  const playlists = useAppSelector(selectPlaylist);

  return (
    <div className={styles.addToPlaylist}>
      <p className={styles.title}>
        Add to playlist
      </p>
      <div className={styles.playlists}>
        {(playlists).map((playlist, idx) =>
          <PlaylistOverview
            key={idx}
            playlist={playlist}
          />
        )}
      </div>
      <Button styledAs='bigWhite' className={styles.add}>
        <span className='material-icons'>
          add
        </span>
        NEW PLAYLIST
      </Button>
    </div>
  );
}

export default AddToPlaylist;
