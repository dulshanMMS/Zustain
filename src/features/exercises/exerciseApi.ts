import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Exercise } from '../../types';

// ⚠️ NOTE: API Ninjas exercises endpoint is currently down for free users
// Using mock data as a fallback solution
const MOCK_EXERCISES: Record<string, Exercise[]> = {
    chest: [
        { name: 'Barbell Bench Press', type: 'strength', muscle: 'chest', equipment: 'barbell', difficulty: 'intermediate', instructions: 'Lie on bench, lower bar to chest, press up' },
        { name: 'Push-ups', type: 'strength', muscle: 'chest', equipment: 'body_only', difficulty: 'beginner', instructions: 'Start in plank, lower body, push back up' },
        { name: 'Incline Dumbbell Press', type: 'strength', muscle: 'chest', equipment: 'dumbbell', difficulty: 'intermediate', instructions: 'Set bench to incline, press dumbbells up' },
        { name: 'Cable Chest Fly', type: 'strength', muscle: 'chest', equipment: 'cable', difficulty: 'intermediate', instructions: 'Stand between cables, bring handles together' },
        { name: 'Dumbbell Pullover', type: 'strength', muscle: 'chest', equipment: 'dumbbell', difficulty: 'beginner', instructions: 'Lie on bench, lower dumbbell behind head' },
    ],
    biceps: [
        { name: 'Barbell Curl', type: 'strength', muscle: 'biceps', equipment: 'barbell', difficulty: 'beginner', instructions: 'Stand with barbell, curl up to shoulders' },
        { name: 'Hammer Curls', type: 'strength', muscle: 'biceps', equipment: 'dumbbell', difficulty: 'beginner', instructions: 'Hold dumbbells like hammers, curl up' },
        { name: 'Concentration Curl', type: 'strength', muscle: 'biceps', equipment: 'dumbbell', difficulty: 'intermediate', instructions: 'Sit, rest elbow on thigh, curl up' },
        { name: 'Cable Curl', type: 'strength', muscle: 'biceps', equipment: 'cable', difficulty: 'beginner', instructions: 'Stand at cable machine, curl handle up' },
        { name: 'Preacher Curl', type: 'strength', muscle: 'biceps', equipment: 'barbell', difficulty: 'intermediate', instructions: 'Use preacher bench, curl bar up' },
    ],
    abdominals: [
        { name: 'Crunches', type: 'strength', muscle: 'abdominals', equipment: 'body_only', difficulty: 'beginner', instructions: 'Lie on back, curl shoulders toward hips' },
        { name: 'Plank', type: 'strength', muscle: 'abdominals', equipment: 'body_only', difficulty: 'beginner', instructions: 'Hold body straight on forearms and toes' },
        { name: 'Russian Twists', type: 'strength', muscle: 'abdominals', equipment: 'body_only', difficulty: 'intermediate', instructions: 'Sit, lean back, twist torso side to side' },
        { name: 'Leg Raises', type: 'strength', muscle: 'abdominals', equipment: 'body_only', difficulty: 'intermediate', instructions: 'Lie on back, raise legs to 90 degrees' },
        { name: 'Mountain Climbers', type: 'cardio', muscle: 'abdominals', equipment: 'body_only', difficulty: 'beginner', instructions: 'Plank position, bring knees to chest alternately' },
    ],
    quadriceps: [
        { name: 'Barbell Squat', type: 'strength', muscle: 'quadriceps', equipment: 'barbell', difficulty: 'intermediate', instructions: 'Bar on shoulders, squat down, stand up' },
        { name: 'Leg Press', type: 'strength', muscle: 'quadriceps', equipment: 'machine', difficulty: 'beginner', instructions: 'Sit in machine, press platform away' },
        { name: 'Walking Lunges', type: 'strength', muscle: 'quadriceps', equipment: 'body_only', difficulty: 'beginner', instructions: 'Step forward, lower hips, alternate legs' },
        { name: 'Leg Extension', type: 'strength', muscle: 'quadriceps', equipment: 'machine', difficulty: 'beginner', instructions: 'Sit in machine, extend legs straight' },
        { name: 'Bulgarian Split Squat', type: 'strength', muscle: 'quadriceps', equipment: 'dumbbell', difficulty: 'intermediate', instructions: 'Rear foot elevated, squat on front leg' },
    ],
    glutes: [
        { name: 'Hip Thrusts', type: 'strength', muscle: 'glutes', equipment: 'barbell', difficulty: 'intermediate', instructions: 'Shoulders on bench, thrust hips up with bar' },
        { name: 'Glute Bridges', type: 'strength', muscle: 'glutes', equipment: 'body_only', difficulty: 'beginner', instructions: 'Lie on back, lift hips off ground' },
        { name: 'Romanian Deadlift', type: 'strength', muscle: 'glutes', equipment: 'barbell', difficulty: 'intermediate', instructions: 'Hinge at hips, lower bar, stand up' },
        { name: 'Cable Kickbacks', type: 'strength', muscle: 'glutes', equipment: 'cable', difficulty: 'beginner', instructions: 'Attach ankle cuff, kick leg back' },
        { name: 'Step-ups', type: 'strength', muscle: 'glutes', equipment: 'body_only', difficulty: 'beginner', instructions: 'Step onto elevated platform, alternate legs' },
    ],
    lats: [
        { name: 'Pull-ups', type: 'strength', muscle: 'lats', equipment: 'body_only', difficulty: 'intermediate', instructions: 'Hang from bar, pull body up' },
        { name: 'Lat Pulldown', type: 'strength', muscle: 'lats', equipment: 'cable', difficulty: 'beginner', instructions: 'Sit at machine, pull bar to chest' },
        { name: 'Barbell Row', type: 'strength', muscle: 'lats', equipment: 'barbell', difficulty: 'intermediate', instructions: 'Bend over, row bar to stomach' },
        { name: 'Seated Cable Row', type: 'strength', muscle: 'lats', equipment: 'cable', difficulty: 'beginner', instructions: 'Sit at cable, pull handle to torso' },
        { name: 'Dumbbell Row', type: 'strength', muscle: 'lats', equipment: 'dumbbell', difficulty: 'beginner', instructions: 'Bend over, row dumbbell to hip' },
    ],
};

// API Ninjas Exercise API (currently down for free users)
// If the API becomes available again, uncomment the lines below:
// const API_KEY = 'ZpNYVzjND6iCj4ZTh13W9A==zTvAlkMMKuL2n4XZ';
// And replace the queryFn in endpoints with:
// getExercisesByMuscle: builder.query<Exercise[], string>({
//     query: (muscle) => `exercises?muscle=${muscle}`,
// }),

export const exerciseApi = createApi({
    reducerPath: 'exerciseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.api-ninjas.com/v1/',
    }),
    endpoints: (builder) => ({
        getExercisesByMuscle: builder.query<Exercise[], string>({
            queryFn: async (muscle) => {
                // Use mock data since API is down for free users
                const exercises = MOCK_EXERCISES[muscle.toLowerCase()] || [];
                return { data: exercises };
            },
        }),
        getExercisesByType: builder.query<Exercise[], string>({
            queryFn: async (type) => {
                // Combine all exercises and filter by type
                const allExercises = Object.values(MOCK_EXERCISES).flat();
                const filtered = allExercises.filter(ex => ex.type === type);
                return { data: filtered };
            },
        }),
        getExercisesByDifficulty: builder.query<Exercise[], string>({
            queryFn: async (difficulty) => {
                // Combine all exercises and filter by difficulty
                const allExercises = Object.values(MOCK_EXERCISES).flat();
                const filtered = allExercises.filter(ex => ex.difficulty === difficulty);
                return { data: filtered };
            },
        }),
    }),
});

export const {
    useGetExercisesByMuscleQuery,
    useGetExercisesByTypeQuery,
    useGetExercisesByDifficultyQuery,
} = exerciseApi;
