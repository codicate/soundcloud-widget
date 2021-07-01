import styles from './LibraryPage.module.scss';
import { useHistory } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectPlaylists } from 'app/playlistSlice';

import PlaylistOverview from 'views/PlaylistOverview';


function LibraryPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const playlists = useAppSelector(selectPlaylists);

  return (
    <div>
      <div className={styles.playlists}>
        {(playlists).map((playlist, idx) =>
          <PlaylistOverview
            key={idx}
            playlist={playlist}
            clickHandler={() => history.push(`/playlist/${playlist.name}`)}
          />
        )}
      </div>
    </div>
  );
}

export default LibraryPage;
