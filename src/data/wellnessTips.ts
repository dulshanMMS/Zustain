export interface WellnessTip {
  id: string;
  title: string;
  description: string;
  category: 'fitness' | 'nutrition' | 'mental' | 'hydration' | 'sleep';
  icon: string;
}

export const wellnessTips: WellnessTip[] = [
  {
    id: '1',
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily to maintain optimal body function and energy levels.',
    category: 'hydration',
    icon: 'droplet',
  },
  {
    id: '2',
    title: 'Warm Up Properly',
    description: 'Always spend 5-10 minutes warming up before exercise to prevent injuries and improve performance.',
    category: 'fitness',
    icon: 'activity',
  },
  {
    id: '3',
    title: 'Rest Between Sets',
    description: 'Take 30-90 seconds rest between sets to allow muscle recovery and maintain workout quality.',
    category: 'fitness',
    icon: 'pause-circle',
  },
  {
    id: '4',
    title: 'Protein After Workout',
    description: 'Consume protein within 30 minutes after exercise to support muscle recovery and growth.',
    category: 'nutrition',
    icon: 'zap',
  },
  {
    id: '5',
    title: 'Quality Sleep',
    description: 'Aim for 7-9 hours of sleep each night. Sleep is when your body repairs and builds muscle.',
    category: 'sleep',
    icon: 'moon',
  },
  {
    id: '6',
    title: 'Progressive Overload',
    description: 'Gradually increase weight, reps, or intensity to continue making progress and avoid plateaus.',
    category: 'fitness',
    icon: 'trending-up',
  },
  {
    id: '7',
    title: 'Mindful Breathing',
    description: 'Practice deep breathing exercises to reduce stress and improve focus during workouts.',
    category: 'mental',
    icon: 'wind',
  },
  {
    id: '8',
    title: 'Balanced Diet',
    description: 'Eat a variety of whole foods including fruits, vegetables, lean proteins, and healthy fats.',
    category: 'nutrition',
    icon: 'heart',
  },
  {
    id: '9',
    title: 'Rest Days Matter',
    description: 'Take at least 1-2 rest days per week to allow full body recovery and prevent burnout.',
    category: 'fitness',
    icon: 'calendar',
  },
  {
    id: '10',
    title: 'Form Over Weight',
    description: 'Perfect your form before increasing weight. Poor form leads to injuries and reduces effectiveness.',
    category: 'fitness',
    icon: 'check-circle',
  },
  {
    id: '11',
    title: 'Morning Stretch',
    description: 'Start your day with 5-10 minutes of stretching to improve flexibility and reduce stiffness.',
    category: 'fitness',
    icon: 'sunrise',
  },
  {
    id: '12',
    title: 'Track Your Progress',
    description: 'Keep a workout journal to monitor improvements and stay motivated on your fitness journey.',
    category: 'fitness',
    icon: 'bar-chart-2',
  },
];

// Get a random tip
export const getRandomTip = (): WellnessTip => {
  const randomIndex = Math.floor(Math.random() * wellnessTips.length);
  return wellnessTips[randomIndex];
};

// Get tip of the day (based on date)
export const getTipOfTheDay = (): WellnessTip => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const tipIndex = dayOfYear % wellnessTips.length;
  return wellnessTips[tipIndex];
};
