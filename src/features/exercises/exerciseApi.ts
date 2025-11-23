import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Exercise } from '../../types';

// API Ninjas Exercise API
// Get your FREE API key from: https://api-ninjas.com/
// Replace 'YOUR_API_KEY_HERE' with your actual API key
const API_KEY = '/1EhEOtvfFFUhDmtMIRTqA==z9hJwBgFlarOBS4t';

export const exerciseApi = createApi({
    reducerPath: 'exerciseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.api-ninjas.com/v1/',
        prepareHeaders: (headers) => {
            headers.set('X-Api-Key', API_KEY);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getExercisesByMuscle: builder.query<Exercise[], string>({
            query: (muscle) => `exercises?muscle=${muscle}`,
            transformResponse: (response: Exercise[]) => {
                return response;
            },
        }),
        getExercisesByType: builder.query<Exercise[], string>({
            query: (type) => `exercises?type=${type}`,
        }),
        getExercisesByDifficulty: builder.query<Exercise[], string>({
            query: (difficulty) => `exercises?difficulty=${difficulty}`,
        }),
    }),
});

export const {
    useGetExercisesByMuscleQuery,
    useGetExercisesByTypeQuery,
    useGetExercisesByDifficultyQuery,
} = exerciseApi;
