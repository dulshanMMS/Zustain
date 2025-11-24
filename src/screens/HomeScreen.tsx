import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
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

  // Fetch exercises based on selected category
  const { data: exercises, isLoading, error, refetch } = useGetExercisesByMuscleQuery(selectedCategory);

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
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
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
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Wellness Tip of the Day */}
        <View style={styles.tipSection}>
          <View style={[styles.tipCard, { 
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
          }]}>
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
          </View>
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
              message="Failed to load exercises. Please try again."
              onRetry={refetch}
            />
          ) : (
            <FlatList
              data={exercises}
              renderItem={renderExerciseItem}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              numColumns={2}
              columnWrapperStyle={styles.exerciseRow}
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
    </View>
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
  },
  greeting: {
    fontSize: 15,
    fontWeight: '500',
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 6,
    letterSpacing: -0.5,
  },
  profileCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  categoriesSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginLeft: 24,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  categoriesList: {
    paddingHorizontal: 24,
  },
  categoryCard: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '700',
  },
  exercisesSection: {
    flex: 1,
    marginTop: 28,
  },
  exerciseRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  exercisesList: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  tipSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
  },
  tipCard: {
    padding: 24,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tipIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  tipBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  tipTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  tipDescription: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.95)',
    lineHeight: 22,
    fontWeight: '500',
  },
});
