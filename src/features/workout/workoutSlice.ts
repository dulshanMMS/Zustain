import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Workout {
    id: string;
    exerciseName: string;
    startTime: string;
    endTime?: string;
    duration: number; // in seconds
    calories: number;
    date: string;
}

interface WorkoutState {
    activeWorkout: Workout | null;
    workoutHistory: Workout[];
    totalCaloriesToday: number;
    totalMinutesToday: number;
}

const initialState: WorkoutState = {
    activeWorkout: null,
    workoutHistory: [],
    totalCaloriesToday: 0,
    totalMinutesToday: 0,
};

const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        startWorkout: (state, action: PayloadAction<{ exerciseName: string }>) => {
            const now = new Date().toISOString();
            state.activeWorkout = {
                id: now,
                exerciseName: action.payload.exerciseName,
                startTime: now,
                duration: 0,
                calories: 0,
                date: new Date().toLocaleDateString(),
            };
        },

        updateWorkoutProgress: (state, action: PayloadAction<{ duration: number; calories: number }>) => {
            if (state.activeWorkout) {
                state.activeWorkout.duration = action.payload.duration;
                state.activeWorkout.calories = action.payload.calories;
            }
        },

        completeWorkout: (state) => {
            if (state.activeWorkout) {
                const completedWorkout = {
                    ...state.activeWorkout,
                    endTime: new Date().toISOString(),
                };

                state.workoutHistory.unshift(completedWorkout);

                // Update daily totals
                const today = new Date().toLocaleDateString();
                if (completedWorkout.date === today) {
                    state.totalCaloriesToday += completedWorkout.calories;
                    state.totalMinutesToday += Math.floor(completedWorkout.duration / 60);
                }

                state.activeWorkout = null;
            }
        },

        cancelWorkout: (state) => {
            state.activeWorkout = null;
        },

        resetDailyStats: (state) => {
            state.totalCaloriesToday = 0;
            state.totalMinutesToday = 0;
        },

        clearWorkoutHistory: (state) => {
            state.workoutHistory = [];
            state.totalCaloriesToday = 0;
            state.totalMinutesToday = 0;
        },
    },
});

export const {
    startWorkout,
    updateWorkoutProgress,
    completeWorkout,
    cancelWorkout,
    resetDailyStats,
    clearWorkoutHistory,
} = workoutSlice.actions;

export default workoutSlice.reducer;
