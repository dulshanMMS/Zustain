import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteExercise } from '../../types';
import { toFavoriteExercise } from '../../utils/helpers';
import type { Exercise } from '../../types';

interface FavoritesState {
  items: FavoriteExercise[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Exercise>) => {
      const favoriteExercise = toFavoriteExercise(action.payload);
      const index = state.items.findIndex(item => item.id === favoriteExercise.id);

      if (index !== -1) {
        // Remove from favorites
        state.items.splice(index, 1);
      } else {
        // Add to favorites
        state.items.unshift(favoriteExercise);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
