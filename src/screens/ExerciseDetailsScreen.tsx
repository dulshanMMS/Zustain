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
import { useTheme } from '../../theme/ThemeContext';
import { Button } from '../../components/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';
import { RootStackParamList } from '../../types';
import { formatDifficulty, formatMuscleName, generateExerciseId } from '../../utils/helpers';

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
          style={[styles.backButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.favoriteButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
          onPress={handleToggleFavorite}
        >
          <Feather
            name="heart"
            size={24}
            color="#FFFFFF"
            fill={isFavorite ? '#FFFFFF' : 'transparent'}
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
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            onPress={handleToggleFavorite}
            variant={isFavorite ? 'outline' : 'primary'}
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  titleSection: {
    padding: 20,
    paddingTop: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  infoCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  instructionsSection: {
    padding: 20,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 8,
  },
  instructionsCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 24,
  },
  actionSection: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
});
