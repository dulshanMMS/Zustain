import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { AuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface AuthNavigatorProps {
  onLoginSuccess: () => void;
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ onLoginSuccess }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {(props) => <RegisterScreen {...props} onRegisterSuccess={onLoginSuccess} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
