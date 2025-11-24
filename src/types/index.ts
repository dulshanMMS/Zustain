// TypeScript interfaces for WellnessHub app

export interface Exercise {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  instructions: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface FavoriteExercise extends Exercise {
  id: string; // Unique ID for favoriting
  addedAt: number; // Timestamp
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  ExerciseDetails: { exercise: Exercise };
  ActiveWorkout: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Activity: undefined;
  Favorites: undefined;
  Profile: undefined;
};

// API Error type
export interface ApiError {
  message: string;
  status?: number;
}

// Muscle categories for filtering
export type MuscleCategory =
  | 'abdominals'
  | 'biceps'
  | 'calves'
  | 'chest'
  | 'forearms'
  | 'glutes'
  | 'hamstrings'
  | 'lats'
  | 'lower_back'
  | 'middle_back'
  | 'neck'
  | 'quadriceps'
  | 'traps'
  | 'triceps';

export interface CategoryItem {
  id: string;
  name: string;
  muscle: MuscleCategory;
  icon: string;
  color: string;
}
