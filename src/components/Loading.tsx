import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface LoadingProps {
  size?: 'small' | 'large';
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ size = 'large', fullScreen = false }) => {
  const { colors } = useTheme();

  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, { backgroundColor: colors.background }]}>
        <ActivityIndicator size={size} color={colors.primary} />
      </View>
    );
  }

  return <ActivityIndicator size={size} color={colors.primary} style={styles.loading} />;
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginVertical: 20,
  },
});
