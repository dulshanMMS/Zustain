import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { ConfirmModal } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateWorkoutProgress, completeWorkout, cancelWorkout } from '../features/workout/workoutSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type ActiveWorkoutNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ActiveWorkout'>;

interface ActiveWorkoutScreenProps {
  navigation: ActiveWorkoutNavigationProp;
}

export const ActiveWorkoutScreen: React.FC<ActiveWorkoutScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const activeWorkout = useAppSelector((state: any) => state.workout.activeWorkout);
  
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Calculate calories from elapsed time
  const calories = Math.floor((elapsedTime / 60) * 5);

  useEffect(() => {
    if (!activeWorkout) {
      // Navigate back if no active workout
      const timer = setTimeout(() => {
        navigation.goBack();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [activeWorkout, navigation]);

  useEffect(() => {
    if (!activeWorkout || isPaused) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, activeWorkout]);

  // Update Redux store when elapsed time changes
  useEffect(() => {
    if (activeWorkout && elapsedTime > 0) {
      dispatch(updateWorkoutProgress({ duration: elapsedTime, calories }));
    }
  }, [elapsedTime, calories, dispatch, activeWorkout]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    setShowCompleteModal(true);
  };

  const handleConfirmComplete = () => {
    setShowCompleteModal(false);
    dispatch(completeWorkout());
    navigation.goBack();
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    dispatch(cancelWorkout());
    navigation.goBack();
  };

  if (!activeWorkout) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <TouchableOpacity onPress={handleCancel}>
            <Feather name="x" size={28} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Active Workout</Text>
          <View style={{ width: 28 }} />
        </View>

      {/* Exercise Name */}
      <View style={styles.exerciseSection}>
        <Text style={[styles.exerciseName, { color: colors.text }]}>
          {activeWorkout.exerciseName}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
          <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
          <Text style={[styles.statusText, { color: colors.success }]}>In Progress</Text>
        </View>
      </View>

      {/* Timer Display */}
      <View style={styles.timerSection}>
        <Text style={[styles.timerLabel, { color: colors.textSecondary }]}>Duration</Text>
        <Text style={[styles.timerValue, { color: colors.text }]}>
          {formatTime(elapsedTime)}
        </Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.statIcon, { backgroundColor: '#F4433620' }]}>
            <Feather name="zap" size={32} color="#F44336" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{calories}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Calories Burned</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.statIcon, { backgroundColor: '#66BB6A20' }]}>
            <Feather name="clock" size={32} color="#66BB6A" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {Math.floor(elapsedTime / 60)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Minutes Active</Text>
        </View>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlsSection}>
        <TouchableOpacity
          style={[styles.controlButton, { 
            backgroundColor: isPaused ? colors.success : colors.warning 
          }]}
          onPress={() => setIsPaused(!isPaused)}
        >
          <Feather name={isPaused ? 'play' : 'pause'} size={32} color="#FFFFFF" style={{ marginRight: 12 }} />
          <Text style={styles.controlButtonText}>
            {isPaused ? 'Resume' : 'Pause'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.completeButton, { 
            backgroundColor: colors.primary 
          }]}
          onPress={handleComplete}
        >
          <Feather name="check-circle" size={32} color="#FFFFFF" style={{ marginRight: 12 }} />
          <Text style={styles.controlButtonText}>Complete Workout</Text>
        </TouchableOpacity>
      </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={[styles.tipText, { color: colors.textSecondary }]}>
            💡 Take breaks when needed and stay hydrated
          </Text>
        </View>
      </ScrollView>

      {/* Complete Workout Modal */}
      <ConfirmModal
        visible={showCompleteModal}
        title="Complete Workout"
        message={`Great job! You burned ${calories} calories in ${Math.floor(elapsedTime / 60)} minutes!`}
        confirmText="Complete"
        cancelText="Continue"
        confirmColor={colors.primary}
        onConfirm={handleConfirmComplete}
        onCancel={() => setShowCompleteModal(false)}
      />

      {/* Cancel Workout Modal */}
      <ConfirmModal
        visible={showCancelModal}
        title="Cancel Workout"
        message="Are you sure you want to cancel this workout? Your progress will be lost."
        confirmText="Yes, Cancel"
        cancelText="No, Continue"
        confirmColor={colors.error}
        onConfirm={handleConfirmCancel}
        onCancel={() => setShowCancelModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  exerciseSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '800',
  },
  timerSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  timerLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  timerValue: {
    fontSize: 72,
    fontWeight: '900',
    letterSpacing: -3,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 8,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 8,
    letterSpacing: -1.5,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  controlsSection: {
    paddingHorizontal: 24,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 16,
  },
  completeButton: {
    paddingVertical: 24,
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  tipsSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  tipText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },
});
