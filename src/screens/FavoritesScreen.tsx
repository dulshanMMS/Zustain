import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { ExerciseCard } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite, clearFavorites } from '../features/favorites/favoritesSlice';
import { RootStackParamList, FavoriteExercise } from '../types';
import { Alert } from 'react-native';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

interface FavoritesScreenProps {
  navigation: FavoritesScreenNavigationProp;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state: any) => state.favorites.items);

  const handleExercisePress = (exercise: FavoriteExercise) => {
    navigation.navigate('ExerciseDetails', { exercise });
  };

  const handleToggleFavorite = (exercise: FavoriteExercise) => {
    dispatch(toggleFavorite(exercise));
  };

  const handleClearAll = () => {
    if (favorites.length === 0) return;

    Alert.alert(
      'Clear All Favorites',
      'Are you sure you want to remove all exercises from your favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => dispatch(clearFavorites()),
        },
      ]
    );
  };

  const renderExerciseItem = ({ item }: { item: FavoriteExercise }) => (
    <ExerciseCard
      exercise={item}
      onPress={() => handleExercisePress(item)}
      isFavorite={true}
      onToggleFavorite={() => handleToggleFavorite(item)}
      showFavoriteButton
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Favorites</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {favorites.length} {favorites.length === 1 ? 'exercise' : 'exercises'} saved
          </Text>
        </View>
        {favorites.length > 0 && (
          <TouchableOpacity
            style={[styles.clearButton, { backgroundColor: colors.error + '20' }]}
            onPress={handleClearAll}
          >
            <Feather name="trash-2" size={20} color={colors.error} />
          </TouchableOpacity>
        )}
      </View>

      {/* Favorites List */}
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconContainer, { backgroundColor: colors.surface }]}>
            <Feather name="heart" size={64} color={colors.textLight} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No Favorites Yet
          </Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Start adding exercises to your favorites to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.exerciseRow}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.exercisesList}
        />
      )}
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
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  clearButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  exercisesList: {
    paddingVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIconContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
