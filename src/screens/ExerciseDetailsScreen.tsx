import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { Button } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { startWorkout } from '../features/workout/workoutSlice';
import { RootStackParamList } from '../types';
import { formatDifficulty, formatMuscleName, generateExerciseId } from '../utils/helpers';

type ExerciseDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExerciseDetails'>;
type ExerciseDetailsRouteProp = RouteProp<RootStackParamList, 'ExerciseDetails'>;

interface ExerciseDetailsScreenProps {
  navigation: ExerciseDetailsNavigationProp;
  route: ExerciseDetailsRouteProp;
}

const { width } = Dimensions.get('window');

export const ExerciseDetailsScreen: React.FC<ExerciseDetailsScreenProps> = ({ navigation, route }) => {
  const { exercise } = route.params;
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state: any) => state.favorites.items);

  const exerciseId = generateExerciseId(exercise);
  const isFavorite = favorites.some((fav: any) => fav.id === exerciseId);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(exercise));
  };

  const handleStartWorkout = () => {
    dispatch(startWorkout({ exerciseName: exercise.name }));
    navigation.navigate('ActiveWorkout');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return colors.beginner;
      case 'intermediate':
        return colors.intermediate;
      case 'expert':
        return colors.expert;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: 'rgba(255,255,255,0.25)' }]}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exercise Details</Text>
        <TouchableOpacity
          style={[styles.favoriteButton, { backgroundColor: isFavorite ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.25)' }]}
          onPress={handleToggleFavorite}
        >
          <Feather
            name={isFavorite ? 'heart' : 'heart'}
            size={24}
            color={isFavorite ? colors.error : '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: colors.text }]}>{exercise.name}</Text>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) + '20' }]}>
            <Text style={[styles.difficultyText, { color: getDifficultyColor(exercise.difficulty) }]}>
              {formatDifficulty(exercise.difficulty)}
            </Text>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.infoGrid}>
          <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.iconCircle, { backgroundColor: colors.primary + '20' }]}>
              <Feather name="target" size={24} color={colors.primary} />
            </View>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Muscle</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{formatMuscleName(exercise.muscle)}</Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.iconCircle, { backgroundColor: colors.secondary + '20' }]}>
              <Feather name="activity" size={24} color={colors.secondary} />
            </View>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Type</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{exercise.type}</Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.iconCircle, { backgroundColor: colors.accent + '20' }]}>
              <Feather name="tool" size={24} color={colors.accent} />
            </View>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Equipment</Text>
            <Text style={[styles.infoValue, { color: colors.text }]} numberOfLines={2}>
              {exercise.equipment || 'None'}
            </Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.iconCircle, { backgroundColor: getDifficultyColor(exercise.difficulty) + '20' }]}>
              <Feather name="trending-up" size={24} color={getDifficultyColor(exercise.difficulty)} />
            </View>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Level</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{formatDifficulty(exercise.difficulty)}</Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsSection}>
          <View style={styles.sectionHeader}>
            <Feather name="list" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Instructions</Text>
          </View>
          <View style={[styles.instructionsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.instructionsText, { color: colors.text }]}>
              {exercise.instructions}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.actionSection}>
          <Button
            title="Start Workout"
            onPress={handleStartWorkout}
            variant="primary"
          />
          <View style={{ height: 16 }} />
          <Button
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            onPress={handleToggleFavorite}
            variant={isFavorite ? 'outline' : 'outline'}
          />
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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  titleSection: {
    padding: 28,
    paddingTop: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 18,
    letterSpacing: -1,
  },
  difficultyBadge: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 28,
    justifyContent: 'space-between',
  },
  infoCard: {
    width: (width - 74) / 2,
    marginBottom: 18,
    padding: 24,
    borderRadius: 24,
    borderWidth: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  infoLabel: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '600',
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  instructionsSection: {
    padding: 28,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    marginLeft: 14,
    letterSpacing: -0.5,
  },
  instructionsCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  instructionsText: {
    fontSize: 17,
    lineHeight: 28,
    fontWeight: '500',
  },
  actionSection: {
    paddingHorizontal: 28,
    marginTop: 20,
  },
});
