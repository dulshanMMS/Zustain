import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

// Use SecureStore for native, AsyncStorage for web
const isWeb = Platform.OS === 'web';

export const authStorage = {
  // Save token securely
  async saveToken(token: string): Promise<void> {
    try {
      if (isWeb) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
      }
    } catch (error) {
      console.error('Error saving token:', error);
      throw error;
    }
  },

  // Get token
  async getToken(): Promise<string | null> {
    try {
      if (isWeb) {
        return await AsyncStorage.getItem(TOKEN_KEY);
      } else {
        return await SecureStore.getItemAsync(TOKEN_KEY);
      }
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Delete token
  async deleteToken(): Promise<void> {
    try {
      if (isWeb) {
        await AsyncStorage.removeItem(TOKEN_KEY);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  },

  // Save user data
  async saveUser(userData: string): Promise<void> {
    try {
      if (isWeb) {
        await AsyncStorage.setItem(USER_KEY, userData);
      } else {
        await SecureStore.setItemAsync(USER_KEY, userData);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  },

  // Get user data
  async getUser(): Promise<string | null> {
    try {
      if (isWeb) {
        return await AsyncStorage.getItem(USER_KEY);
      } else {
        return await SecureStore.getItemAsync(USER_KEY);
      }
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Delete user data
  async deleteUser(): Promise<void> {
    try {
      if (isWeb) {
        await AsyncStorage.removeItem(USER_KEY);
      } else {
        await SecureStore.deleteItemAsync(USER_KEY);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  },

  // Clear all auth data
  async clearAll(): Promise<void> {
    await this.deleteToken();
    await this.deleteUser();
  },
};
