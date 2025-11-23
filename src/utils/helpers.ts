import { Exercise, FavoriteExercise } from '../types';

// Generate unique ID for exercises
export const generateExerciseId = (exercise: Exercise): string => {
  return `${exercise.name}-${exercise.muscle}-${exercise.type}`.toLowerCase().replace(/\s+/g, '-');
};

// Convert Exercise to FavoriteExercise
export const toFavoriteExercise = (exercise: Exercise): FavoriteExercise => {
  return {
    ...exercise,
    id: generateExerciseId(exercise),
    addedAt: Date.now(),
  };
};

// Format difficulty level for display
export const formatDifficulty = (difficulty: string): string => {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
};

// Format muscle name for display
export const formatMuscleName = (muscle: string): string => {
  return muscle
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Capitalize first letter of each word
export const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Format date
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};
