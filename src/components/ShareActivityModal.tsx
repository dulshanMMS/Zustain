import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme';

const { width } = Dimensions.get('window');

type ShareTab = 'Default' | 'Animated' | 'Photos';

interface ShareActivityModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ShareActivityModal: React.FC<ShareActivityModalProps> = ({ visible, onClose }) => {
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<ShareTab>('Default');

  // Activity ring data
  const moveData = { value: 494, max: 400, unit: 'kcal', color: '#F44336', percentage: 123 };
  const exerciseData = { value: 23, max: 30, unit: 'min', color: '#66BB6A', percentage: 76 };
  const standData = { value: 17, max: 12, unit: 'hours', color: '#4FC3F7', percentage: 141 };

  // Circle dimensions
  const size = 200;
  const strokeWidth = 12;

  const renderRing = (data: typeof moveData, radius: number) => {
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (Math.min(data.percentage, 100) / 100) * circumference;

    return (
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={data.color}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={progress}
        strokeLinecap="round"
        rotation="-90"
        origin={`${size / 2}, ${size / 2}`}
      />
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Share Activity</Text>
              <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
                Friday, Sep 30, 2022
              </Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Feather name="x" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {(['Default', 'Animated', 'Photos'] as ShareTab[]).map((tab) => (
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
                  { color: selectedTab === tab ? colors.background : colors.text }
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Preview Card */}
          <View style={styles.previewContainer}>
            <View style={[styles.previewCard, { backgroundColor: colors.surface }]}>
              {/* Date */}
              <Text style={[styles.previewDate, { color: colors.textSecondary }]}>
                Aug 05, 2022
              </Text>

              {/* Activity Rings and Stats */}
              <View style={styles.previewContent}>
                {/* Left side - Stats */}
                <View style={styles.statsColumn}>
                  <View style={styles.statRow}>
                    <Text style={[styles.statLabel, { color: moveData.color }]}>Move</Text>
                    <Text style={[styles.statValue, { color: colors.text }]}>
                      {moveData.value}
                    </Text>
                    <Text style={[styles.statUnit, { color: colors.textSecondary }]}>
                      {moveData.unit}
                    </Text>
                  </View>

                  <View style={styles.statRow}>
                    <Text style={[styles.statLabel, { color: exerciseData.color }]}>Exercise</Text>
                    <Text style={[styles.statValue, { color: colors.text }]}>
                      {exerciseData.value}
                    </Text>
                    <Text style={[styles.statUnit, { color: colors.textSecondary }]}>
                      {exerciseData.unit}
                    </Text>
                  </View>

                  <View style={styles.statRow}>
                    <Text style={[styles.statLabel, { color: standData.color }]}>Stand</Text>
                    <Text style={[styles.statValue, { color: colors.text }]}>
                      {standData.value}
                    </Text>
                    <Text style={[styles.statUnit, { color: colors.textSecondary }]}>
                      {standData.unit}
                    </Text>
                  </View>
                </View>

                {/* Right side - Rings */}
                <View style={styles.ringsContainer}>
                  <Svg width={size} height={size}>
                    {/* Background circles */}
                    {[80, 60, 40].map((radius, index) => (
                      <Circle
                        key={`bg-${index}`}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#00000010"
                        strokeWidth={strokeWidth}
                        fill="none"
                      />
                    ))}
                    
                    {/* Progress circles */}
                    {renderRing(moveData, 80)}
                    {renderRing(exerciseData, 60)}
                    {renderRing(standData, 40)}
                  </Svg>
                </View>
              </View>

              {/* Hashtag */}
              <View style={styles.hashtagContainer}>
                <Feather name="activity" size={14} color={colors.success} style={styles.hashtag} />
                <Text style={[styles.hashtag, { color: colors.text }]}>#FitnessView</Text>
              </View>
            </View>
          </View>

          {/* Share Button */}
          <View style={styles.shareButtonContainer}>
            <TouchableOpacity style={[styles.shareButton, { backgroundColor: colors.primary }]}>
              <Feather name="share-2" size={20} color="#FFFFFF" style={styles.shareButtonIcon} />
              <Text style={styles.shareButtonText}>Share to Social Media</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
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
    fontWeight: '800',
  },
  previewContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  previewCard: {
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  previewDate: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 20,
  },
  previewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statsColumn: {
    flex: 1,
  },
  statRow: {
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  statUnit: {
    fontSize: 14,
    fontWeight: '700',
  },
  ringsContainer: {
    marginLeft: 20,
  },
  hashtagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hashtag: {
    fontSize: 15,
    fontWeight: '800',
    marginHorizontal: 3,
  },
  shareButtonContainer: {
    paddingHorizontal: 24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  shareButtonIcon: {
    marginRight: 10,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
});
