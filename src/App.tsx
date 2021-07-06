import styles from './App.module.scss';
import { useEffect, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPlayer, playTrack } from 'app/playerSlice';

import Header from 'views/Header';
import MiniPlayer from 'views/Miniplayer';

const SuggestionPage = lazy(() => import('pages/SuggestionPage'));
const SearchPage = lazy(() => import('pages/Searchpage'));
const LibraryPage = lazy(() => import('pages/LibraryPage'));
const PlaylistPage = lazy(() => import('pages/PlaylistPage'));

function App() {
  const dispatch = useAppDispatch();
  const { currentTrackIndex } = useAppSelector(selectPlayer);

  useEffect(() => {
    dispatch(playTrack());
  }, [dispatch, currentTrackIndex]);

  return <>
    <Header />

    <main id={styles.main}>
      <Suspense fallback=''>
        <Switch>
          <Route exact path='/'>
            <SuggestionPage />
          </Route>
          <Route exact path='/search/:input'>
            <SearchPage />
          </Route>
          <Route exact path='/library'>
            <LibraryPage />
          </Route>
          <Route exact path='/playlist/:playlistName'>
            <PlaylistPage />
          </Route>
        </Switch>
      </Suspense>
    </main>

    <MiniPlayer />
  </>;
};

export default App;
