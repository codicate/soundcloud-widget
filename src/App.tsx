import styles from './App.module.scss';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPlayer, playTrack } from 'app/playerSlice';

import Header from 'views/Header';
import MiniPlayer from 'views/Miniplayer';

import SuggestionPage from 'pages/SuggestionPage';
import SearchPage from 'pages/Searchpage';
import Library from 'pages/Library';

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
          <Library />
        </Route>
      </Switch>
    </main>

    <MiniPlayer />
  </>;
};

export default App;
