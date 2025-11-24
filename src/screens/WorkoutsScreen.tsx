import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme';

const { width } = Dimensions.get('window');

type TabType = 'Month' | 'Year' | 'Type' | 'Stats';

interface WorkoutType {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

export const WorkoutsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<TabType>('Type');

  const workoutTypes: WorkoutType[] = [
    { id: '1', name: 'Walking', icon: 'user', count: 121, color: '#66BB6A' },
    { id: '2', name: 'Running', icon: 'zap', count: 62, color: '#CDDC39' },
    { id: '3', name: 'Cycling', icon: 'circle', count: 33, color: '#CDDC39' },
    { id: '4', name: 'Other', icon: 'activity', count: 4, color: '#CDDC39' },
    { id: '5', name: 'Stair Climbing', icon: 'trending-up', count: 2, color: '#CDDC39' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Workouts</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['Month', 'Year', 'Type', 'Stats'] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && [styles.tabActive, { backgroundColor: colors.text }]
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabText,
              { color: selectedTab === tab ? colors.background : colors.text },
              selectedTab === tab && styles.tabTextActive
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Workout Types List */}
        <View style={styles.workoutsContainer}>
          {workoutTypes.map((workout, index) => (
            <TouchableOpacity
              key={workout.id}
              style={[styles.workoutCard, { backgroundColor: colors.surface }]}
            >
              <View style={styles.workoutContent}>
                <View style={[styles.workoutIcon, { backgroundColor: workout.color + '20' }]}>
                  <Feather name={workout.icon as any} size={24} color={workout.color} />
                </View>
                <View style={styles.workoutInfo}>
                  <Text style={[styles.workoutName, { color: colors.text }]}>
                    {workout.name}
                  </Text>
                  <Text style={[styles.workoutCount, { color: colors.textSecondary }]}>
                    {workout.count} workouts
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Navigation Indicator */}
        <View style={styles.bottomNav}>
          <View style={[styles.navDot, { backgroundColor: colors.border }]} />
          <View style={[styles.navDot, { backgroundColor: colors.border }]} />
          <View style={[styles.navDot, { backgroundColor: colors.border }]} />
          <View style={[styles.navDot, { backgroundColor: colors.primary }]} />
        </View>
      </ScrollView>

      {/* CTA Button */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity style={[styles.ctaButton, { backgroundColor: '#CDDC39' }]}>
          <Text style={styles.ctaText}>GET IT NOW</Text>
        </TouchableOpacity>
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
    paddingBottom: 16,
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 8,
  },
  tabActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
  },
  tabTextActive: {
    fontWeight: '800',
  },
  workoutsContainer: {
    paddingHorizontal: 20,
  },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 12,
  },
  workoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  workoutInfo: {
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  workoutCount: {
    fontSize: 14,
    fontWeight: '700',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  navDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  ctaContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  ctaButton: {
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 1,
  },
});
