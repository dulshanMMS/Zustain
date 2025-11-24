import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WaterState {
  dailyGoal: number; // in ml
  consumed: number; // in ml today
  lastReset: string; // date string to track daily reset
}

const initialState: WaterState = {
  dailyGoal: 2000, // 2 liters default
  consumed: 0,
  lastReset: new Date().toDateString(),
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    addWater: (state, action: PayloadAction<number>) => {
      // Check if we need to reset for a new day
      const today = new Date().toDateString();
      if (state.lastReset !== today) {
        state.consumed = 0;
        state.lastReset = today;
      }
      state.consumed += action.payload;
    },
    removeWater: (state, action: PayloadAction<number>) => {
      state.consumed = Math.max(0, state.consumed - action.payload);
    },
    setDailyGoal: (state, action: PayloadAction<number>) => {
      state.dailyGoal = action.payload;
    },
    resetDaily: (state) => {
      state.consumed = 0;
      state.lastReset = new Date().toDateString();
    },
  },
});

export const { addWater, removeWater, setDailyGoal, resetDaily } = waterSlice.actions;
export default waterSlice.reducer;
