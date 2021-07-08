import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import noticeReducer from './noticeSlice';
import playerReducer from './playerSlice';
import trackReducer from './trackSlice';
import playlistReducer from './playlistSlice';

import Soundcloud from 'soundcloud';


Soundcloud.initialize({
  client_id: process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['playlist']
};

const rootReducer = combineReducers({
  notice: noticeReducer,
  player: playerReducer,
  track: trackReducer,
  playlist: playlistReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
        'player/playTrack/fulfilled'
      ],
      ignoredPaths: ['player.player', 'track.tracks']
    }
  })
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export type statusState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export const errorHandler = (func: () => Promise<unknown>) => {
  try {
    return func();
  } catch (err) {
    console.error('redux store error:', err);
    return err;
  }
};