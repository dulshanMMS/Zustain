import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../theme';

interface LoadingProps {
  size?: 'small' | 'large';
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ size = 'large', fullScreen = false }) => {
  const { colors } = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Rotation animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const spinnerSize = size === 'large' ? 60 : 40;
  const borderWidth = size === 'large' ? 6 : 4;

  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, { backgroundColor: colors.background }]}>
        <Animated.View
          style={[
            styles.spinner,
            {
              width: spinnerSize,
              height: spinnerSize,
              borderRadius: spinnerSize / 2,
              borderWidth,
              borderTopColor: colors.primary,
              borderRightColor: colors.primary + '40',
              borderBottomColor: colors.primary + '40',
              borderLeftColor: colors.primary + '40',
              transform: [{ rotate: spin }, { scale: scaleValue }],
            },
          ]}
        />
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.spinner,
        styles.loading,
        {
          width: spinnerSize,
          height: spinnerSize,
          borderRadius: spinnerSize / 2,
          borderWidth,
          borderTopColor: colors.primary,
          borderRightColor: colors.primary + '40',
          borderBottomColor: colors.primary + '40',
          borderLeftColor: colors.primary + '40',
          transform: [{ rotate: spin }, { scale: scaleValue }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  spinner: {
    borderStyle: 'solid',
  },
});
