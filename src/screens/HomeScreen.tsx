import React, { useState } from 'react';
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
import { useTheme } from '../../theme/ThemeContext';
import { ExerciseCard } from '../../components/ExerciseCard';
import { Loading } from '../../components/Loading';
import { ErrorView } from '../../components/ErrorView';
import { useGetExercisesByMuscleQuery } from '../../features/exercises/exerciseApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';
import { RootStackParamList, CategoryItem, MuscleCategory, Exercise } from '../../types';
import { generateExerciseId } from '../../utils/helpers';

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
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={refetch}
                colors={[colors.primary]}
                tintColor={colors.primary}
              />
            }
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
    padding: 20,
    paddingTop: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greeting: {
    fontSize: 14,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  categoriesSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 12,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
  },
  exercisesSection: {
    flex: 1,
    marginTop: 24,
  },
  exerciseRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
});
