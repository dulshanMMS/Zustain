import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addWater, removeWater } from '../features/water/waterSlice';

const { width } = Dimensions.get('window');

export const WaterTrackingScreen: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const waterData = useAppSelector((state: any) => state.water);

  const waterPercentage = Math.min((waterData.consumed / waterData.dailyGoal) * 100, 100);
  const hourlyAvg = Math.round(waterData.consumed / 3); // Mock hourly average

  // Circle dimensions
  const size = 280;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (waterPercentage / 100) * circumference;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Water Tracking</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Large Circular Progress */}
      <View style={styles.circleContainer}>
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.info + '20'}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.info}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        
        {/* Center content */}
        <View style={styles.circleCenter}>
          <Text style={[styles.circleValue, { color: colors.text }]}>
            {waterData.consumed.toLocaleString()}
            <Text style={[styles.circleUnit, { color: colors.text }]}>ml</Text>
          </Text>
          <Text style={[styles.circlePercentage, { color: colors.textSecondary }]}>
            {Math.round(waterPercentage)}%
          </Text>
        </View>
      </View>

      {/* Quick Add Section */}
      <View style={styles.quickAddSection}>
        <Text style={[styles.quickAddTitle, { color: colors.text }]}>Quick Add</Text>
        
        <View style={styles.quickAddGrid}>
          {/* Row 1 */}
          <TouchableOpacity
            style={[styles.quickAddButton, { backgroundColor: colors.info }]}
            onPress={() => dispatch(addWater(250))}
          >
            <Text style={styles.quickAddAmount}>250</Text>
            <Text style={styles.quickAddUnit}>mL</Text>
            <Feather name="droplet" size={20} color="#FFFFFF" style={styles.quickAddIcon} />
            <Text style={styles.quickAddLabel}>Water</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickAddButton, { backgroundColor: colors.info }]}
            onPress={() => dispatch(addWater(350))}
          >
            <Text style={styles.quickAddAmount}>350</Text>
            <Text style={styles.quickAddUnit}>mL</Text>
            <Feather name="droplet" size={20} color="#FFFFFF" style={styles.quickAddIcon} />
            <Text style={styles.quickAddLabel}>Water</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickAddButton, { backgroundColor: colors.info }]}
            onPress={() => dispatch(addWater(500))}
          >
            <Text style={styles.quickAddAmount}>500</Text>
            <Text style={styles.quickAddUnit}>mL</Text>
            <Feather name="droplet" size={20} color="#FFFFFF" style={styles.quickAddIcon} />
            <Text style={styles.quickAddLabel}>Water</Text>
          </TouchableOpacity>

          {/* Row 2 */}
          <TouchableOpacity
            style={[styles.quickAddButton, { backgroundColor: colors.info }]}
            onPress={() => dispatch(addWater(750))}
          >
            <Text style={styles.quickAddAmount}>750</Text>
            <Text style={styles.quickAddUnit}>mL</Text>
            <Feather name="droplet" size={20} color="#FFFFFF" style={styles.quickAddIcon} />
            <Text style={styles.quickAddLabel}>Water</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickAddButton, { backgroundColor: colors.info }]}
            onPress={() => dispatch(addWater(1000))}
          >
            <Text style={styles.quickAddAmount}>1,000</Text>
            <Text style={styles.quickAddUnit}>mL</Text>
            <Feather name="droplet" size={20} color="#FFFFFF" style={styles.quickAddIcon} />
            <Text style={styles.quickAddLabel}>Water</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickAddButton, styles.otherButton, { backgroundColor: colors.info }]}
          >
            <Text style={styles.otherButtonText}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.info }]}>TOTAL</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {waterData.consumed.toLocaleString()} <Text style={[styles.statUnit, { color: colors.textSecondary }]}>mL</Text>
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.info }]}>HOURLY AVG.</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {hourlyAvg} <Text style={[styles.statUnit, { color: colors.textSecondary }]}>mL</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    position: 'relative',
  },
  circleCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleValue: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -2,
  },
  circleUnit: {
    fontSize: 32,
    fontWeight: '700',
  },
  circlePercentage: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },
  quickAddSection: {
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  quickAddTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  quickAddGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAddButton: {
    width: (width - 80) / 3,
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  quickAddAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  quickAddUnit: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  quickAddIcon: {
    marginVertical: 4,
  },
  quickAddLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  otherButton: {
    justifyContent: 'center',
  },
  otherButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 28,
    paddingTop: 24,
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -1,
  },
  statUnit: {
    fontSize: 16,
    fontWeight: '700',
  },
});
