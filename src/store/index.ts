import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { exerciseApi } from '../features/exercises/exerciseApi';
import authReducer from '../features/auth/authSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import waterReducer from '../features/water/waterSlice';
import workoutReducer from '../features/workout/workoutSlice';

// Persist config
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['auth', 'favorites', 'water', 'workout'], // Persist auth, favorites, water, and workout
};

// Combine reducers
const rootReducer = combineReducers({
  [exerciseApi.reducerPath]: exerciseApi.reducer,
  auth: authReducer,
  favorites: favoritesReducer,
  water: waterReducer,
  workout: workoutReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(exerciseApi.middleware),
});

export const persistor = persistStore(store);

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
