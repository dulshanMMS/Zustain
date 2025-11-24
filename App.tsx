import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { store, persistor } from './src/store';
import { ThemeProvider } from './src/theme';
import { RootNavigator } from './src/navigation/RootNavigator';

// Simple loading component that doesn't use theme
const SimpleLoading = () => (
  <View style={styles.loading}>
    <ActivityIndicator size="large" color="#4CAF50" />
  </View>
);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<SimpleLoading />} persistor={persistor}>
        <ThemeProvider>
          <RootNavigator />
          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
