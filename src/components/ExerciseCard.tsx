import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { Exercise } from '../types';
import { formatDifficulty, formatMuscleName, truncateText } from '../utils/helpers';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  showFavoriteButton?: boolean;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with padding

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onPress,
  isFavorite = false,
  onToggleFavorite,
  showFavoriteButton = true,
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

  return (
    <TouchableOpacity
      style={[
        styles.card,
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
            fill={isFavorite ? colors.error : 'transparent'}
          />
        </TouchableOpacity>
      )}

      {/* Content */}
      <View style={styles.content}>
        {/* Difficulty Badge */}
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(exercise.difficulty) + '20' },
          ]}
        >
          <Text
            style={[
              styles.difficultyText,
              { color: getDifficultyColor(exercise.difficulty) },
            ]}
          >
            {formatDifficulty(exercise.difficulty)}
          </Text>
        </View>

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
    width: cardWidth,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    marginTop: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    minHeight: 38,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    marginLeft: 6,
    textTransform: 'capitalize',
  },
});
