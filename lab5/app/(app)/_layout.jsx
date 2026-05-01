import { Stack, Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f8fafc',
        },
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 20,
          color: '#1e293b',
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: '#8b5cf6',
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Store',
        }} 
      />
      <Stack.Screen 
        name="details/[id]" 
        options={{ 
          title: '',
        }} 
      />
    </Stack>
  );
}
