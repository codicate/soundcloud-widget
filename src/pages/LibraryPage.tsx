import styles from './LibraryPage.module.scss';
import { Link, Route } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { selectPlaylistsAsArray } from 'app/playlistSlice';

import PlaylistOverview from 'views/PlaylistOverview';
import PlaylistPage from './PlaylistPage';


function LibraryPage() {
  const playlists = useAppSelector(selectPlaylistsAsArray);

  return (
    <>
      <Route exact path='/library'>
        <div className={styles.playlists}>
          <h3 className={styles.title}>PLAYLISTS</h3>
          {playlists.map((playlist, idx) =>
            <Link key={idx} to={`/playlist/${playlist.name}`}>
              <PlaylistOverview
                key={idx}
                playlist={playlist}
              />
            </Link>
          )}
        </div>
      </Route>

      {(playlists).map((playlist, idx) =>
        <Route key={idx} path={`/playlist/${playlist.name}`}>
          <PlaylistPage playlist={playlist} />
        </Route>
      )}
    </>
  );
}

export default LibraryPage;
