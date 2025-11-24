import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useAppSelector } from '../store/hooks';

const { width } = Dimensions.get('window');

export const ActivityScreen: React.FC = () => {
  const { colors } = useTheme();
  const waterData = useAppSelector((state: any) => state.water);
  const favoritesCount = useAppSelector((state: any) => state.favorites.items.length);
  const workoutData = useAppSelector((state: any) => state.workout);
  const [showGoals, setShowGoals] = useState(true);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  // Animate on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Calculate percentages
  const waterPercentage = Math.min((waterData.consumed / waterData.dailyGoal) * 100, 100);
  
  // Use real workout data
  const moveCalories = workoutData.totalCaloriesToday || 0;
  const moveGoal = 400;
  const movePercentage = Math.min((moveCalories / moveGoal) * 100, 100);
  
  const exerciseMinutes = workoutData.totalMinutesToday || 0;
  const exerciseGoal = 30;
  const exercisePercentage = Math.min((exerciseMinutes / exerciseGoal) * 100, 100);

  // Get current date
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  const renderActivityRing = (percentage: number, color: string, radius: number, strokeWidth: number) => {
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (Math.min(percentage, 100) / 100) * circumference;

    return (
      <>
        <Circle
          cx={140}
          cy={140}
          r={radius}
          stroke={color + '20'}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={140}
          cy={140}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          rotation="-90"
          origin={`${140}, ${140}`}
        />
      </>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Activity</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {dateString}
        </Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Activity Rings */}
        <Animated.View style={[styles.ringsSection, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <LinearGradient
            colors={['rgba(244, 67, 54, 0.08)', 'rgba(102, 187, 106, 0.08)', 'rgba(79, 195, 247, 0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ringsBackground}
          >
            <View style={styles.ringsContainer}>
            <Svg width={280} height={280}>
              {renderActivityRing(movePercentage, '#F44336', 120, 16)}
              {renderActivityRing(exercisePercentage, '#66BB6A', 90, 16)}
              {renderActivityRing(waterPercentage, '#4FC3F7', 60, 16)}
            </Svg>
          </View>

          {/* Stats Below Rings */}
          <View style={styles.statsRow}>
            <View style={styles.statBlock}>
              <Text style={[styles.statLabel, { color: '#F44336' }]}>Move</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {moveCalories} <Text style={[styles.statUnit, { color: colors.textSecondary }]}>kcal</Text>
              </Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={[styles.statLabel, { color: '#66BB6A' }]}>Exercise</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {exerciseMinutes} <Text style={[styles.statUnit, { color: colors.textSecondary }]}>min</Text>
              </Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={[styles.statLabel, { color: '#4FC3F7' }]}>Water</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {Math.round(waterPercentage)}%
              </Text>
            </View>
          </View>
          </LinearGradient>
        </Animated.View>

        {/* Goals Section */}
        {showGoals && (
          <View style={styles.goalsSection}>
            <View style={styles.goalsSectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Goals</Text>
              <TouchableOpacity onPress={() => setShowGoals(false)}>
                <Text style={[styles.collapseText, { color: colors.primary }]}>Collapse</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.goalsGrid}>
              {/* Active Calories */}
              <View style={[styles.goalCard, { backgroundColor: colors.surface }]}>
                <View style={[styles.goalIcon, { backgroundColor: '#F4433620' }]}>
                  <Feather name="zap" size={24} color="#F44336" />
                </View>
                <Text style={[styles.goalValue, { color: colors.text }]}>{moveCalories}</Text>
                <Text style={[styles.goalUnit, { color: colors.textSecondary }]}>kcal</Text>
                <Text style={[styles.goalLabel, { color: colors.text }]}>Active Calories</Text>
                <View style={[styles.goalProgress, { backgroundColor: '#F4433620' }]}>
                  <View style={[styles.goalProgressFill, { 
                    backgroundColor: '#F44336',
                    width: `${Math.min(movePercentage, 100)}%`
                  }]} />
                </View>
                <Text style={[styles.goalPercentage, { color: '#F44336' }]}>
                  {Math.round(movePercentage)}%
                </Text>
              </View>

              {/* Exercise Minutes */}
              <View style={[styles.goalCard, { backgroundColor: colors.surface }]}>
                <View style={[styles.goalIcon, { backgroundColor: '#66BB6A20' }]}>
                  <Feather name="activity" size={24} color="#66BB6A" />
                </View>
                <Text style={[styles.goalValue, { color: colors.text }]}>{exerciseMinutes}</Text>
                <Text style={[styles.goalUnit, { color: colors.textSecondary }]}>min</Text>
                <Text style={[styles.goalLabel, { color: colors.text }]}>Exercise Minutes</Text>
                <View style={[styles.goalProgress, { backgroundColor: '#66BB6A20' }]}>
                  <View style={[styles.goalProgressFill, { 
                    backgroundColor: '#66BB6A',
                    width: `${Math.min(exercisePercentage, 100)}%`
                  }]} />
                </View>
                <Text style={[styles.goalPercentage, { color: '#66BB6A' }]}>
                  {Math.round(exercisePercentage)}%
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  ringsSection: {
    paddingVertical: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  ringsBackground: {
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  ringsContainer: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  statBlock: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  statUnit: {
    fontSize: 14,
    fontWeight: '700',
  },
  goalsSection: {
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  goalsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  collapseText: {
    fontSize: 16,
    fontWeight: '700',
  },
  goalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalCard: {
    flex: 1,
    marginHorizontal: 8,
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  goalIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalValue: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  goalUnit: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
    marginBottom: 8,
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
  },
  goalProgress: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  goalPercentage: {
    fontSize: 13,
    fontWeight: '800',
  },
  shareSection: {
    paddingHorizontal: 28,
    paddingVertical: 24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  shareText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
