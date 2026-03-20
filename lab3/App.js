import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/context/ThemeContext';
import { ScoreProvider } from './src/context/ScoreContext';
import RootNavigator from './src/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from './src/context/ThemeContext';

const AppContent = () => {
  const { isDarkMode } = useTheme();
  return (
    <NavigationContainer>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ScoreProvider>
          <AppContent />
        </ScoreProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}