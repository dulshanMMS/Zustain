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

type TabType = 'Day' | 'Week' | 'Month' | 'Year';

export const StatsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<TabType>('Month');

  // Mock data for bar charts
  const stepsData = [7500, 5200, 6800, 8200, 8900, 9100, 7900, 6500, 8300, 9200, 8700, 7800, 8900, 9400, 8200, 7500, 8100, 9000, 8600, 7900, 8500, 9100, 8400, 7600, 8800, 9300, 8100, 7400, 8700, 7200];
  const standHoursData = [10, 8, 9, 11, 12, 13, 11, 9, 12, 14, 13, 11, 12, 15, 13, 11, 12, 14, 13, 12, 13, 14, 13, 11, 13, 15, 12, 10, 14, 11];
  const caloriesData = [350, 280, 310, 390, 425, 445, 380, 305, 405, 460, 420, 370, 435, 475, 395, 360, 385, 440, 415, 380, 410, 450, 405, 365, 425, 465, 385, 350, 420, 340];

  const maxSteps = Math.max(...stepsData);
  const totalSteps = stepsData.reduce((a, b) => a + b, 0);
  const avgSteps = Math.round(totalSteps / stepsData.length);

  const totalStandHours = standHoursData.reduce((a, b) => a + b, 0);
  const totalCalories = caloriesData.reduce((a, b) => a + b, 0);

  const renderBarChart = (data: number[], color: string, height: number = 60) => {
    const maxValue = Math.max(...data);
    const visibleData = data.slice(-7); // Show last 7 days for week view
    
    return (
      <View style={styles.chartContainer}>
        <View style={styles.barsContainer}>
          {visibleData.map((value, index) => {
            const barHeight = (value / maxValue) * height;
            return (
              <View key={index} style={styles.barWrapper}>
                <View
                  style={[styles.bar, {
                    height: barHeight,
                    backgroundColor: color,
                  }]}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.chartLabels}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <Text key={index} style={[styles.chartLabel, { color: colors.textSecondary }]}>
              {day}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Stats</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['Day', 'Week', 'Month', 'Year'] as TabType[]).map((tab) => (
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

      {/* Date Range */}
      <View style={styles.dateRange}>
        <TouchableOpacity>
          <Feather name="chevron-left" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        <Text style={[styles.dateText, { color: colors.textSecondary }]}>
          September 2022
        </Text>
        <TouchableOpacity>
          <Feather name="chevron-right" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Steps */}
        <View style={styles.statSection}>
          <TouchableOpacity style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <View style={styles.statHeader}>
              <View style={styles.statIconContainer}>
                <View style={[styles.statIcon, { backgroundColor: '#66BB6A20' }]}>
                  <Feather name="activity" size={20} color="#66BB6A" />
                </View>
                <View>
                  <Text style={[styles.statLabel, { color: colors.text }]}>Steps</Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {totalSteps.toLocaleString()}
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color={colors.textSecondary} />
            </View>
            {renderBarChart(stepsData, '#66BB6A')}
            <View style={styles.chartFooter}>
              <Text style={[styles.chartFooterText, { color: colors.textSecondary }]}>
                01 Sep
              </Text>
              <Text style={[styles.chartFooterText, { color: colors.textSecondary }]}>
                30 Sep
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stand Hours */}
        <View style={styles.statSection}>
          <TouchableOpacity style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <View style={styles.statHeader}>
              <View style={styles.statIconContainer}>
                <View style={[styles.statIcon, { backgroundColor: '#4FC3F720' }]}>
                  <Feather name="user" size={20} color="#4FC3F7" />
                </View>
                <View>
                  <Text style={[styles.statLabel, { color: colors.text }]}>Stand Hours</Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {totalStandHours}
                    <Text style={[styles.statUnit, { color: colors.textSecondary }]}>hr</Text>
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color={colors.textSecondary} />
            </View>
            {renderBarChart(standHoursData, '#4FC3F7', 50)}
            <View style={styles.chartFooter}>
              <Text style={[styles.chartFooterText, { color: colors.textSecondary }]}>
                12 AM
              </Text>
              <Text style={[styles.chartFooterText, { color: colors.textSecondary }]}>
                12 AM
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Active Calories */}
        <View style={styles.statSection}>
          <TouchableOpacity style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <View style={styles.statHeader}>
              <View style={styles.statIconContainer}>
                <View style={[styles.statIcon, { backgroundColor: '#F4433620' }]}>
                  <Feather name="zap" size={20} color="#F44336" />
                </View>
                <View>
                  <Text style={[styles.statLabel, { color: colors.text }]}>Active Calories</Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {totalCalories.toLocaleString()}
                    <Text style={[styles.statUnit, { color: colors.textSecondary }]}>kcal</Text>
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color={colors.textSecondary} />
            </View>
            {renderBarChart(caloriesData, '#F44336', 55)}
            <View style={styles.chartFooter}>
              <Text style={[styles.chartFooterText, { color: colors.textSecondary }]}>
                01 Sep
              </Text>
              <Text style={[styles.chartFooterText, { color: colors.textSecondary }]}>
                30 Sep
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Exercise Minutes */}
        <View style={styles.statSection}>
          <TouchableOpacity style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <View style={styles.statHeader}>
              <View style={styles.statIconContainer}>
                <View style={[styles.statIcon, { backgroundColor: '#CDDC3920' }]}>
                  <Feather name="droplet" size={20} color="#CDDC39" />
                </View>
                <View>
                  <Text style={[styles.statLabel, { color: colors.text }]}>Exercise Minutes</Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    643
                    <Text style={[styles.statUnit, { color: colors.textSecondary }]}>min</Text>
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color={colors.textSecondary} />
            </View>
            {renderBarChart([12, 9, 11, 14, 15, 16, 14], '#CDDC39', 45)}
            <View style={styles.chartFooter}>
              <Text style={[styles.chartFooterText, { color: colors.textSecondary }]}>
                01 Sep
              </Text>
              <Text style={[styles.chartFooterText, { color: colors.textSecondary }]}>
                30 Sep
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation Indicator */}
        <View style={styles.bottomNav}>
          <View style={[styles.navDot, { backgroundColor: colors.border }]} />
          <View style={[styles.navDot, { backgroundColor: colors.border }]} />
          <View style={[styles.navDot, { backgroundColor: colors.primary }]} />
          <View style={[styles.navDot, { backgroundColor: colors.border }]} />
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
    marginBottom: 16,
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
  dateRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '700',
    marginHorizontal: 16,
  },
  statSection: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  statCard: {
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -1,
  },
  statUnit: {
    fontSize: 14,
    fontWeight: '700',
  },
  chartContainer: {
    marginBottom: 12,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 70,
    marginBottom: 8,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 2,
  },
  bar: {
    width: '80%',
    borderRadius: 4,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  chartLabel: {
    fontSize: 11,
    fontWeight: '700',
    width: 30,
    textAlign: 'center',
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  chartFooterText: {
    fontSize: 12,
    fontWeight: '600',
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
});
