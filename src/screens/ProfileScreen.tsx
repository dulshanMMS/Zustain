import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import { clearFavorites } from '../features/favorites/favoritesSlice';
import { addWater, removeWater } from '../features/water/waterSlice';
import { authStorage } from '../features/auth/authStorage';

interface ProfileScreenProps {
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.auth.user);
  const favoritesCount = useAppSelector((state: any) => state.favorites.items.length);
  const waterData = useAppSelector((state: any) => state.water);
  
  const waterPercentage = Math.min((waterData.consumed / waterData.dailyGoal) * 100, 100);
  const glassesConsumed = Math.floor(waterData.consumed / 250); // 250ml per glass
  const totalGlasses = Math.ceil(waterData.dailyGoal / 250);

  const handleAddWater = (amount: number) => {
    dispatch(addWater(amount));
  };

  const handleRemoveWater = () => {
    dispatch(removeWater(250));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await authStorage.clearAll();
            dispatch(logout());
            onLogout();
          },
        },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will remove all your favorites. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => dispatch(clearFavorites()),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <View style={styles.profileImageContainer}>
            <View style={[styles.profileImage, { backgroundColor: colors.white }]}>
              <Text style={[styles.profileInitial, { color: colors.primary }]}>
                {user?.firstName?.charAt(0) || 'U'}
              </Text>
            </View>
          </View>
          <Text style={styles.userName}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Feather name="heart" size={24} color={colors.error} />
            <Text style={[styles.statValue, { color: colors.text }]}>{favoritesCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Favorites</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Feather name="activity" size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Workouts</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Feather name="trending-up" size={24} color={colors.success} />
            <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Streak</Text>
          </View>
        </View>

        {/* Water Intake Tracker */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Water Intake</Text>
          
          <View style={[styles.waterCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {/* Header */}
            <View style={styles.waterHeader}>
              <View style={styles.waterHeaderLeft}>
                <View style={[styles.waterIcon, { backgroundColor: colors.info + '20' }]}>
                  <Feather name="droplet" size={24} color={colors.info} />
                </View>
                <View>
                  <Text style={[styles.waterTitle, { color: colors.text }]}>Daily Goal</Text>
                  <Text style={[styles.waterSubtitle, { color: colors.textSecondary }]}>
                    {glassesConsumed} of {totalGlasses} glasses
                  </Text>
                </View>
              </View>
              <Text style={[styles.waterAmount, { color: colors.info }]}>
                {waterData.consumed}ml
              </Text>
            </View>

            {/* Progress Bar */}
            <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    backgroundColor: colors.info,
                    width: `${waterPercentage}%` 
                  }
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.textSecondary }]}>
              {Math.round(waterPercentage)}% of daily goal
            </Text>

            {/* Quick Add Buttons */}
            <View style={styles.waterActions}>
              <TouchableOpacity
                style={[styles.waterButton, { backgroundColor: colors.info + '15', borderColor: colors.info }]}
                onPress={() => handleAddWater(250)}
              >
                <Feather name="plus" size={18} color={colors.info} />
                <Text style={[styles.waterButtonText, { color: colors.info }]}>Glass</Text>
                <Text style={[styles.waterButtonSubtext, { color: colors.info }]}>250ml</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.waterButton, { backgroundColor: colors.info + '15', borderColor: colors.info }]}
                onPress={() => handleAddWater(500)}
              >
                <Feather name="plus" size={18} color={colors.info} />
                <Text style={[styles.waterButtonText, { color: colors.info }]}>Bottle</Text>
                <Text style={[styles.waterButtonSubtext, { color: colors.info }]}>500ml</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.waterButton, { backgroundColor: colors.error + '15', borderColor: colors.error }]}
                onPress={handleRemoveWater}
                disabled={waterData.consumed === 0}
              >
                <Feather name="minus" size={18} color={waterData.consumed === 0 ? colors.textLight : colors.error} />
                <Text style={[styles.waterButtonText, { color: waterData.consumed === 0 ? colors.textLight : colors.error }]}>Undo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          
          <View style={[styles.settingItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.primary + '20' }]}>
                <Feather name={isDark ? 'moon' : 'sun'} size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Dark Mode</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  {isDark ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              ios_backgroundColor={colors.border}
            />
          </View>
        </View>

        {/* Actions Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions</Text>
          
          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={handleClearData}
          >
            <View style={[styles.settingIcon, { backgroundColor: colors.warning + '20' }]}>
              <Feather name="trash-2" size={20} color={colors.warning} />
            </View>
            <View style={styles.actionContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Clear All Data</Text>
              <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                Remove all favorites
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={handleLogout}
          >
            <View style={[styles.settingIcon, { backgroundColor: colors.error + '20' }]}>
              <Feather name="log-out" size={20} color={colors.error} />
            </View>
            <View style={styles.actionContent}>
              <Text style={[styles.settingTitle, { color: colors.error }]}>Logout</Text>
              <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                Sign out of your account
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appInfoText, { color: colors.textLight }]}>
            WellnessHub v1.0.0
          </Text>
          <Text style={[styles.appInfoText, { color: colors.textLight }]}>
            Health & Wellness Tracker
          </Text>
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
    paddingBottom: 48,
    alignItems: 'center',
  },
  profileImageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  profileInitial: {
    fontSize: 48,
    fontWeight: '800',
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  userEmail: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: -24,
    gap: 14,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 13,
    marginTop: 6,
    fontWeight: '600',
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  settingSubtitle: {
    fontSize: 13,
    marginTop: 3,
    fontWeight: '500',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
  },
  actionContent: {
    flex: 1,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  appInfoText: {
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '500',
  },
  waterCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
  },
  waterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  waterHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waterIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  waterTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  waterSubtitle: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
  },
  waterAmount: {
    fontSize: 28,
    fontWeight: '800',
  },
  progressBarContainer: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  waterActions: {
    flexDirection: 'row',
    gap: 10,
  },
  waterButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterButtonText: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
  waterButtonSubtext: {
    fontSize: 11,
    marginTop: 3,
    fontWeight: '600',
  },
});
