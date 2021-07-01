import styles from './App.module.scss';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPlayer, playTrack } from 'app/playerSlice';

import Searchbar from 'views/Searchbar';
import MiniPlayer from 'views/Miniplayer';

import SuggestionPage from 'pages/SuggestionPage';
import SearchPage from 'pages/Searchpage';

function App() {
  const dispatch = useAppDispatch();
  const { currentTrackIndex } = useAppSelector(selectPlayer);

  useEffect(() => {
    dispatch(playTrack());
  }, [dispatch, currentTrackIndex]);

  return <>
    <Searchbar />
    <main id={styles.main}>
      <Switch>
        <Route exact path='/'>
          <SuggestionPage />
        </Route>
        <Route exact path='/search/:input'>
          <SearchPage />
        </Route>
      </Switch>
    </main>

    <MiniPlayer />
  </>;
};

export default App;
