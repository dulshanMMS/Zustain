import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { ExerciseCard, Loading, ErrorView } from '../components';
import { useGetExercisesByMuscleQuery } from '../features/exercises/exerciseApi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { RootStackParamList, CategoryItem, MuscleCategory, Exercise } from '../types';
import { generateExerciseId } from '../utils/helpers';
import { getTipOfTheDay, WellnessTip } from '../data/wellnessTips';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const categories: CategoryItem[] = [
  { id: '1', name: 'Chest', muscle: 'chest', icon: 'zap', color: '#FF6B6B' },
  { id: '2', name: 'Back', muscle: 'lats', icon: 'shield', color: '#4ECDC4' },
  { id: '3', name: 'Arms', muscle: 'biceps', icon: 'trending-up', color: '#45B7D1' },
  { id: '4', name: 'Shoulders', muscle: 'traps', icon: 'crosshair', color: '#FFA07A' },
  { id: '5', name: 'Legs', muscle: 'quadriceps', icon: 'arrow-up', color: '#98D8C8' },
  { id: '6', name: 'Core', muscle: 'abdominals', icon: 'disc', color: '#F7DC6F' },
  { id: '7', name: 'Glutes', muscle: 'glutes', icon: 'minimize', color: '#BB8FCE' },
  { id: '8', name: 'Cardio', muscle: 'hamstrings', icon: 'activity', color: '#85C1E2' },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors, isDark } = useTheme();
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<MuscleCategory>('chest');
  const [dailyTip, setDailyTip] = useState<WellnessTip>(getTipOfTheDay());
  const favorites = useAppSelector((state) => state.favorites.items);
  const user = useAppSelector((state) => state.auth.user);
  const waterData = useAppSelector((state: any) => state.water);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  // Fade in animation on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Calculate water percentage and favorites count
  const waterPercentage = Math.min((waterData.consumed / waterData.dailyGoal) * 100, 100);
  const favoritesCount = favorites.length;
  
  // Get workout statistics
  const workoutData = useAppSelector((state: any) => state.workout);
  const todayCalories = workoutData.totalCaloriesToday || 0;
  const todayMinutes = workoutData.totalMinutesToday || 0;
  const workoutCount = workoutData.workoutHistory?.length || 0;

  // Fetch exercises based on selected category
  const { data: exercises, isLoading, error, refetch } = useGetExercisesByMuscleQuery(selectedCategory);

  // Show better error message for API issues
  const apiError = error as any;
  const isApiKeyError = apiError?.status === 400 || apiError?.status === 401 || apiError?.status === 403;

  const handleExercisePress = (exercise: Exercise) => {
    navigation.navigate('ExerciseDetails', { exercise });
  };

  const handleToggleFavorite = (exercise: Exercise) => {
    dispatch(toggleFavorite(exercise));
  };

  const isFavorite = (exercise: Exercise): boolean => {
    const exerciseId = generateExerciseId(exercise);
    return favorites.some((fav) => fav.id === exerciseId);
  };

  const renderCategoryItem = ({ item }: { item: CategoryItem }) => {
    const isSelected = selectedCategory === item.muscle;
    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          {
            backgroundColor: isSelected ? item.color : colors.surface,
            borderColor: isSelected ? item.color : colors.border,
          },
        ]}
        onPress={() => setSelectedCategory(item.muscle)}
        activeOpacity={0.7}
      >
        <Feather
          name={item.icon as any}
          size={24}
          color={isSelected ? '#FFFFFF' : item.color}
        />
        <View style={{ width: 12 }} />
        <Text
          style={[
            styles.categoryName,
            { color: isSelected ? '#FFFFFF' : colors.text },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <ExerciseCard
      exercise={item}
      onPress={() => handleExercisePress(item)}
      isFavorite={isFavorite(item)}
      onToggleFavorite={() => handleToggleFavorite(item)}
      showFavoriteButton
      fullWidth
    />
  );

  return (
    <Animated.View style={[styles.container, { backgroundColor: colors.background, opacity: fadeAnim }]}>
      {/* Header */}
      <LinearGradient
        colors={[colors.surface, colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            Welcome back,
          </Text>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.firstName || 'User'}
          </Text>
        </View>
        <View style={[styles.profileCircle, { backgroundColor: colors.primary }]}>
          <Text style={styles.profileInitial}>
            {user?.firstName?.charAt(0) || 'U'}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Today's Stats Summary */}
        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: 24, marginBottom: 16 }]}>
            Today's Progress
          </Text>
          <View style={styles.statsGrid}>
            <LinearGradient
              colors={['#FF6B6B', '#FF8E8E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}
            >
              <View style={styles.statIconContainer}>
                <Feather name="zap" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.statValue}>{todayCalories}</Text>
              <Text style={styles.statLabel}>Calories Burned</Text>
              <Text style={styles.statSubLabel}>Today</Text>
            </LinearGradient>

            <LinearGradient
              colors={['#4ECDC4', '#6FE3DB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}
            >
              <View style={styles.statIconContainer}>
                <Feather name="clock" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.statValue}>{todayMinutes}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
              <Text style={styles.statSubLabel}>Exercised</Text>
            </LinearGradient>
          </View>

          <View style={styles.statsGrid}>
            <LinearGradient
              colors={['#45B7D1', '#68C5DB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}
            >
              <View style={styles.statIconContainer}>
                <Feather name="droplet" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.statValue}>{Math.round(waterPercentage)}%</Text>
              <Text style={styles.statLabel}>Water Goal</Text>
              <Text style={styles.statSubLabel}>{waterData.consumed}ml</Text>
            </LinearGradient>

            <LinearGradient
              colors={['#BB8FCE', '#D2A8E0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}
            >
              <View style={styles.statIconContainer}>
                <Feather name="activity" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.statValue}>{workoutCount}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
              <Text style={styles.statSubLabel}>Completed</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Wellness Tip of the Day */}
        <View style={styles.tipSection}>
          <LinearGradient
            colors={['#4CAF50', '#66BB6A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.tipCard, { 
              shadowColor: colors.primary,
            }]}
          >
            <View style={styles.tipHeader}>
              <View style={styles.tipIconContainer}>
                <Feather name={dailyTip.icon as any} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.tipBadge}>
                <Text style={styles.tipBadgeText}>Tip of the Day</Text>
              </View>
            </View>
            <Text style={styles.tipTitle}>{dailyTip.title}</Text>
            <Text style={styles.tipDescription}>{dailyTip.description}</Text>
          </LinearGradient>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Categories
          </Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Exercises List */}
        <View style={styles.exercisesSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {categories.find((c) => c.muscle === selectedCategory)?.name} Exercises
          </Text>

          {isLoading ? (
            <Loading />
          ) : error ? (
            <ErrorView
              message={isApiKeyError 
                ? "⚠️ API Key Error: Please add your API Ninjas key in src/features/exercises/exerciseApi.ts\n\nGet a FREE key at api-ninjas.com" 
                : "Failed to load exercises. Please try again."}
              onRetry={refetch}
            />
          ) : (
            <FlatList
              data={exercises}
              renderItem={renderExerciseItem}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.exercisesList}
              scrollEnabled={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Feather name="inbox" size={64} color={colors.textLight} />
                  <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                    No exercises found
                  </Text>
                </View>
              }
            />
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.7,
  },
  userName: {
    fontSize: 32,
    fontWeight: '900',
    marginTop: 4,
    letterSpacing: -1,
  },
  profileCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  categoriesSection: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    marginLeft: 24,
    marginBottom: 18,
    letterSpacing: -0.5,
  },
  categoriesList: {
    paddingHorizontal: 24,
  },
  categoryCard: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    marginRight: 14,
    borderWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '800',
  },
  exercisesSection: {
    flex: 1,
    marginTop: 32,
  },
  exerciseRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  exercisesList: {
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 17,
    marginTop: 18,
    fontWeight: '600',
  },
  tipSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  tipCard: {
    padding: 28,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  tipIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipBadge: {
    backgroundColor: 'rgba(255,255,255,0.35)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  tipBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tipTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  tipDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    lineHeight: 24,
    fontWeight: '500',
  },
  statsSection: {
    paddingTop: 20,
    paddingBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  statCard: {
    width: '48%',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  statIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  statLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 6,
    textAlign: 'center',
  },
  statSubLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
});
