import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { ExerciseDetailsScreen } from '../screens/ExerciseDetailsScreen';
import { RootStackParamList } from '../types';
import { useAppSelector } from '../store/hooks';
import { Loading } from '../components/Loading';
import { authStorage } from '../features/auth/authStorage';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../features/auth/authSlice';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state: any) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await authStorage.getToken();
      const userData = await authStorage.getUser();

      if (token && userData) {
        const user = JSON.parse(userData);
        dispatch(setCredentials({ user, token }));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    // Navigation will be handled automatically by state change
  };

  const handleLogout = async () => {
    await authStorage.clearAll();
  };

  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth">
            {(props) => <AuthNavigator {...props} onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Main">
              {(props) => <MainTabNavigator {...props} onLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen 
              name="ExerciseDetails" 
              component={ExerciseDetailsScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
