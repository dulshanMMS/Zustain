import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { Exercise } from '../types';
import { formatDifficulty, formatMuscleName, truncateText } from '../utils/helpers';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  showFavoriteButton?: boolean;
  fullWidth?: boolean;
}

const { width } = Dimensions.get('window');

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onPress,
  isFavorite = false,
  onToggleFavorite,
  showFavoriteButton = true,
  fullWidth = false,
}) => {
  const { colors } = useTheme();

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

  const getDifficultyGradient = (difficulty: string): [string, string] => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return ['#81C784', '#66BB6A'];
      case 'intermediate':
        return ['#FFB74D', '#FFA726'];
      case 'expert':
        return ['#E57373', '#EF5350'];
      default:
        return [colors.textSecondary, colors.textSecondary];
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        fullWidth && styles.cardFullWidth,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Favorite Button */}
      {showFavoriteButton && onToggleFavorite && (
        <TouchableOpacity
          style={[styles.favoriteButton, { backgroundColor: colors.background }]}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          <Feather
            name="heart"
            size={18}
            color={isFavorite ? colors.error : colors.textLight}
          />
        </TouchableOpacity>
      )}

      {/* Content */}
      <View style={styles.content}>
        {/* Difficulty Badge */}
        <LinearGradient
          colors={getDifficultyGradient(exercise.difficulty)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.difficultyBadge}
        >
          <Text style={styles.difficultyText}>
            {formatDifficulty(exercise.difficulty)}
          </Text>
        </LinearGradient>

        {/* Exercise Name */}
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {exercise.name}
        </Text>

        {/* Muscle Group */}
        <View style={styles.infoRow}>
          <Feather name="target" size={14} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {formatMuscleName(exercise.muscle)}
          </Text>
        </View>

        {/* Equipment */}
        {exercise.equipment && exercise.equipment !== 'none' && (
          <View style={styles.infoRow}>
            <Feather name="tool" size={14} color={colors.secondary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              {truncateText(exercise.equipment, 15)}
            </Text>
          </View>
        )}

        {/* Type */}
        <View style={styles.infoRow}>
          <Feather name="activity" size={14} color={colors.accent} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {exercise.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (width - 64) / 2,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardFullWidth: {
    width: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  content: {
    marginTop: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
    minHeight: 44,
    lineHeight: 23,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 10,
    textTransform: 'capitalize',
    fontWeight: '600',
  },
});
