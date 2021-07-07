import styles from './App.module.scss';
import { useEffect, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPlayer, playTrack } from 'app/playerSlice';

import Header from 'views/Header';
import MiniPlayer from 'views/Miniplayer';
import ErrorFallback from 'components/ErrorFallback';
import Notifier from 'views/Notifier';

const SuggestionPage = lazy(() => import('pages/SuggestionPage'));
const SearchPage = lazy(() => import('pages/Searchpage'));
import LibraryPage from 'pages/LibraryPage';


function App() {
  const dispatch = useAppDispatch();
  const { currentTrackIndex } = useAppSelector(selectPlayer);

  useEffect(() => {
    dispatch(playTrack());
  }, [dispatch, currentTrackIndex]);

  return <>
    <Header />

    <main id={styles.main}>
      <ErrorFallback>
        <Suspense fallback=''>
          <Switch>
            <Route exact path='/'>
              <SuggestionPage />
            </Route>
            <Route exact path='/search/:input'>
              <SearchPage />
            </Route>
            <LibraryPage />
          </Switch>
        </Suspense>
      </ErrorFallback>
    </main>

    <MiniPlayer />
    <Notifier />
  </>;
};

export default App;
