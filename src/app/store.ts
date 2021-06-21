import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import soundcloudReducer from 'app/soundcloudSlice';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
};

const rootReducer = combineReducers({
  soundcloud: soundcloudReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
        'tracks/playTrack/fulfilled'
      ],
      ignoredPaths: ['soundcloud.player', 'soundcloud.tracks']
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

export const errorHandler = (func: () => Promise<any>) => {
  try {
    return func();
  } catch (err) {
    console.error('redux store error:', err);
    return err;
  }
};