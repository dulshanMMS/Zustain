import React from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const WorkoutInsightsScreen: React.FC = () => {
  const { colors } = useTheme();

  // Mock heart rate data
  const heartRateData = [
    { time: 0, value: 95, zone: 'warmup' },
    { time: 2, value: 105, zone: 'warmup' },
    { time: 4, value: 118, zone: 'warmup' },
    { time: 6, value: 125, zone: 'fatburn' },
    { time: 8, value: 135, zone: 'fatburn' },
    { time: 10, value: 142, zone: 'fatburn' },
    { time: 12, value: 148, zone: 'fatburn' },
    { time: 14, value: 155, zone: 'cardio' },
    { time: 16, value: 162, zone: 'cardio' },
    { time: 18, value: 168, zone: 'peak' },
    { time: 20, value: 175, zone: 'peak' },
    { time: 22, value: 171, zone: 'peak' },
    { time: 24, value: 165, zone: 'cardio' },
    { time: 26, value: 158, zone: 'cardio' },
    { time: 28, value: 151, zone: 'fatburn' },
    { time: 30, value: 145, zone: 'fatburn' },
  ];

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'warmup': return '#4FC3F7';
      case 'fatburn': return '#66BB6A';
      case 'cardio': return '#FF9800';
      case 'peak': return '#F44336';
      default: return colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.workoutIcon}>
            <Feather name="zap" size={20} color={colors.success} />
          </View>
          <View>
            <Text style={[styles.workoutTitle, { color: colors.text }]}>
              Functional Strength Training
            </Text>
            <Text style={[styles.workoutTime, { color: colors.textSecondary }]}>
              Today at 4:22 PM
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Feather name="share-2" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Heart Rate Graph */}
        <View style={styles.graphSection}>
          <View style={styles.graphCard}>
            {/* Graph Background Grid */}
            <View style={styles.graphContainer}>
              {[...Array(4)].map((_, i) => (
                <View key={i} style={[styles.gridLine, { borderColor: colors.border }]} />
              ))}
              
              {/* Y-axis labels */}
              <View style={styles.yAxis}>
                <Text style={[styles.axisLabel, { color: colors.textSecondary }]}>167</Text>
                <Text style={[styles.axisLabel, { color: colors.textSecondary }]}>148</Text>
                <Text style={[styles.axisLabel, { color: colors.textSecondary }]}>118</Text>
              </View>

              {/* Heart Rate Line */}
              <View style={styles.chartArea}>
                {heartRateData.map((point, index) => {
                  if (index === heartRateData.length - 1) return null;
                  const next = heartRateData[index + 1];
                  const x1 = (point.time / 30) * (width - 120);
                  const x2 = (next.time / 30) * (width - 120);
                  const y1 = 150 - ((point.value - 90) / 90) * 150;
                  const y2 = 150 - ((next.value - 90) / 90) * 150;
                  
                  return (
                    <View
                      key={index}
                      style={[styles.lineSegment, {
                        left: x1,
                        top: y1,
                        width: Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
                        height: 3,
                        backgroundColor: getZoneColor(point.zone),
                        transform: [
                          { rotate: `${Math.atan2(y2 - y1, x2 - x1)}rad` }
                        ]
                      }]}
                    />
                  );
                })}
              </View>
            </View>

            {/* Heart Rate Zones */}
            <View style={styles.zonesContainer}>
              <View style={styles.zoneItem}>
                <View style={[styles.zoneDot, { backgroundColor: '#4FC3F7' }]} />
                <Text style={[styles.zoneLabel, { color: '#4FC3F7' }]}>WARM UP</Text>
                <Text style={[styles.zoneValue, { color: colors.text }]}>8</Text>
                <Text style={[styles.zoneUnit, { color: colors.textSecondary }]}>min</Text>
              </View>
              <View style={styles.zoneItem}>
                <View style={[styles.zoneDot, { backgroundColor: '#66BB6A' }]} />
                <Text style={[styles.zoneLabel, { color: '#66BB6A' }]}>FAT BURN</Text>
                <Text style={[styles.zoneValue, { color: colors.text }]}>11</Text>
                <Text style={[styles.zoneUnit, { color: colors.textSecondary }]}>min</Text>
              </View>
              <View style={styles.zoneItem}>
                <View style={[styles.zoneDot, { backgroundColor: '#FF9800' }]} />
                <Text style={[styles.zoneLabel, { color: '#FF9800' }]}>CARDIO</Text>
                <Text style={[styles.zoneValue, { color: colors.text }]}>16</Text>
                <Text style={[styles.zoneUnit, { color: colors.textSecondary }]}>min</Text>
              </View>
              <View style={styles.zoneItem}>
                <View style={[styles.zoneDot, { backgroundColor: '#F44336' }]} />
                <Text style={[styles.zoneLabel, { color: '#F44336' }]}>PEAK</Text>
                <Text style={[styles.zoneValue, { color: colors.text }]}>19</Text>
                <Text style={[styles.zoneUnit, { color: colors.textSecondary }]}>min</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Summary</Text>
          
          <View style={styles.summaryGrid}>
            {/* Total Time */}
            <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
              <View style={[styles.summaryIcon, { backgroundColor: colors.success + '20' }]}>
                <Feather name="clock" size={24} color={colors.success} />
              </View>
              <Text style={[styles.summaryValue, { color: colors.text }]}>53</Text>
              <Text style={[styles.summaryUnit, { color: colors.textSecondary }]}>m</Text>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Total Time</Text>
            </View>

            {/* Total Distance */}
            <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
              <View style={[styles.summaryIcon, { backgroundColor: colors.warning + '20' }]}>
                <Feather name="map-pin" size={24} color={colors.warning} />
              </View>
              <Text style={[styles.summaryValue, { color: colors.text }]}>0</Text>
              <Text style={[styles.summaryUnit, { color: colors.textSecondary }]}>km</Text>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Total Distance</Text>
            </View>

            {/* Avg Heart Rate */}
            <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
              <View style={[styles.summaryIcon, { backgroundColor: colors.error + '20' }]}>
                <Feather name="heart" size={24} color={colors.error} />
              </View>
              <Text style={[styles.summaryValue, { color: colors.text }]}>152</Text>
              <Text style={[styles.summaryUnit, { color: colors.textSecondary }]}>bpm</Text>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Avg. Heart Rate</Text>
            </View>

            {/* Min-Max Heart Rate */}
            <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
              <View style={[styles.summaryIcon, { backgroundColor: colors.error + '20' }]}>
                <Feather name="activity" size={24} color={colors.error} />
              </View>
              <Text style={[styles.summaryValue, { color: colors.text }]}>87-185</Text>
              <Text style={[styles.summaryUnit, { color: colors.textSecondary }]}>bpm</Text>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Min-Max Heart Rate</Text>
            </View>
          </View>
        </View>

        {/* Bottom Navigation Indicator */}
        <View style={styles.bottomNav}>
          <View style={[styles.navDot, { backgroundColor: colors.border }]} />
          <View style={[styles.navDot, { backgroundColor: colors.primary }]} />
          <View style={[styles.navDot, { backgroundColor: colors.border }]} />
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
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  workoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(102, 187, 106, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  workoutTime: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  graphCard: {
    padding: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },
  graphContainer: {
    height: 180,
    position: 'relative',
    marginBottom: 20,
  },
  gridLine: {
    position: 'absolute',
    left: 40,
    right: 0,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  yAxis: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  axisLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  chartArea: {
    position: 'absolute',
    left: 50,
    right: 20,
    top: 0,
    bottom: 0,
  },
  lineSegment: {
    position: 'absolute',
    borderRadius: 2,
  },
  zonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  zoneItem: {
    alignItems: 'center',
  },
  zoneDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  zoneLabel: {
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
  },
  zoneValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  zoneUnit: {
    fontSize: 12,
    fontWeight: '600',
  },
  summarySection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryCard: {
    width: (width - 56) / 2,
    marginBottom: 16,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
  },
  summaryUnit: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '800',
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
