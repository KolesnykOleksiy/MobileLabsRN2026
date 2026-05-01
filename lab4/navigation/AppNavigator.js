import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FileViewerScreen from '../screens/FileViewerScreen';
import FileInfoScreen from '../screens/FileInfoScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e293b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'File Manager' }}
      />
      <Stack.Screen 
        name="FileViewer" 
        component={FileViewerScreen} 
        options={{ title: 'Edit File' }}
      />
      <Stack.Screen 
        name="FileInfo" 
        component={FileInfoScreen} 
        options={{ title: 'File Details' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
