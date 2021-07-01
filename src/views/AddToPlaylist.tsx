import styles from './AddToPlaylist.module.scss';
import { SoundcloudTrack } from 'soundcloud';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectPlaylist, createPlaylist, addToPlaylist } from 'app/playlistSlice';

import PlaylistOverview from 'views/PlaylistOverview';
import Button from 'components/Button';


function AddToPlaylist({
  track,
  hideAddToPlaylist
}: {
  track: SoundcloudTrack;
  hideAddToPlaylist: () => void;
}) {
  const dispatch = useAppDispatch();
  const playlists = useAppSelector(selectPlaylist);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if(e.target !== e.currentTarget) return;
        hideAddToPlaylist();
      }}
    >
      <div className={styles.addToPlaylist}>
        <div className={styles.titleDiv}>
          <p>
            Add to...
          </p>
          <Button className='material-icons'>close</Button>
        </div>
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
    </div>
  );
}

export default AddToPlaylist;
