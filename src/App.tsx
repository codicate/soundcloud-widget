import styles from './App.module.scss';
import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPlayer, playTrack } from 'app/playerSlice';

import Header from 'views/Header';
import MiniPlayer from 'views/Miniplayer';

import SuggestionPage from 'pages/SuggestionPage';
import SearchPage from 'pages/Searchpage';
import LibraryPage from 'pages/LibraryPage';
import PlaylistPage from 'pages/PlaylistPage';

function App() {
  const dispatch = useAppDispatch();
  const { currentTrackIndex } = useAppSelector(selectPlayer);

  useEffect(() => {
    dispatch(playTrack());
  }, [dispatch, currentTrackIndex]);

  return <>
    <Header />
    <main id={styles.main}>
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
    </main>

    <MiniPlayer />
  </>;
};

export default App;
