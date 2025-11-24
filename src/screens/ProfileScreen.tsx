import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ConfirmModal, EditProfileModal } from '../components';
import { useTheme } from '../theme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { persistor } from '../store';
import { logout, updateUser } from '../features/auth/authSlice';
import { clearFavorites } from '../features/favorites/favoritesSlice';
import { addWater, removeWater, resetDaily } from '../features/water/waterSlice';
import { resetDailyStats, clearWorkoutHistory } from '../features/workout/workoutSlice';
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
  const workoutHistory = useAppSelector((state: any) => state.workout.workoutHistory);
  const workoutCount = workoutHistory?.length || 0;
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showClearDataModal, setShowClearDataModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
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
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    await authStorage.clearAll();
    dispatch(logout());
    setShowLogoutModal(false);
    onLogout();
  };

  const handleClearData = () => {
    setShowClearDataModal(true);
  };

  const handleConfirmClearData = async () => {
    // Clear all data from Redux
    dispatch(clearFavorites());
    dispatch(resetDaily());
    dispatch(clearWorkoutHistory());
    
    // Purge persisted storage to ensure clean state
    await persistor.purge();
    await persistor.flush();
    
    // Force a small delay to ensure persistence completes
    setTimeout(() => {
      setShowClearDataModal(false);
    }, 100);
  };

  const handleSaveProfile = (firstName: string, lastName: string, email: string) => {
    dispatch(updateUser({ firstName, lastName, email }));
    setShowEditModal(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, '#66BB6A', colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setShowEditModal(true)}
          >
            <Feather name="edit-2" size={20} color="#FFFFFF" />
          </TouchableOpacity>
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
        </LinearGradient>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Feather name="heart" size={24} color={colors.error} />
            <Text style={[styles.statValue, { color: colors.text }]}>{favoritesCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Favorites</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Feather name="activity" size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{workoutCount}</Text>
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
            Zustain v1.0.0
          </Text>
          <Text style={[styles.appInfoText, { color: colors.textLight }]}>
            Health & Wellness Tracker
          </Text>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        visible={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutModal(false)}
        confirmColor={colors.error}
      />

      {/* Clear Data Confirmation Modal */}
      <ConfirmModal
        visible={showClearDataModal}
        title="Clear All Data"
        message="This will remove all your favorites. This action cannot be undone."
        confirmText="Clear"
        cancelText="Cancel"
        onConfirm={handleConfirmClearData}
        onCancel={() => setShowClearDataModal(false)}
        confirmColor={colors.error}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={showEditModal}
        currentFirstName={user?.firstName || ''}
        currentLastName={user?.lastName || ''}
        currentEmail={user?.email || ''}
        onSave={handleSaveProfile}
        onCancel={() => setShowEditModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 52,
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  profileImageContainer: {
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  profileInitial: {
    fontSize: 52,
    fontWeight: '900',
  },
  userName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -1,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -28,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '900',
    marginTop: 12,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: '700',
    opacity: 0.7,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 18,
    letterSpacing: -0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 20,
    borderWidth: 0,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  settingSubtitle: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '600',
    opacity: 0.7,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 0,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  actionContent: {
    flex: 1,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  appInfoText: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
    opacity: 0.5,
  },
  waterCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 28,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  waterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  waterHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waterIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  waterTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  waterSubtitle: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '600',
    opacity: 0.7,
  },
  waterAmount: {
    fontSize: 32,
    fontWeight: '900',
  },
  progressBarContainer: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '700',
    opacity: 0.7,
  },
  waterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  waterButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  waterButtonText: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 8,
  },
  waterButtonSubtext: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '700',
    opacity: 0.8,
  },
});

