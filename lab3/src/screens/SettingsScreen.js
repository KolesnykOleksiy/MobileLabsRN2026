import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  padding: 20px;
`;

const SettingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.card};
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: ${props => props.theme.border};
`;

const SettingLabel = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.text};
`;

const SettingsScreen = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();

  return (
    <Container theme={colors}>
      <SettingRow theme={colors}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name={isDarkMode ? 'moon' : 'sunny'} size={20} color={colors.primary} style={{ marginRight: 10 }} />
          <SettingLabel theme={colors}>Dark Mode</SettingLabel>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: colors.primary }}
          thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
        />
      </SettingRow>

      <SettingRow theme={colors}>
        <SettingLabel theme={colors}>Version</SettingLabel>
        <SettingLabel theme={colors} style={{ color: '#8E8E93' }}>1.0.0</SettingLabel>
      </SettingRow>
    </Container>
  );
};

export default SettingsScreen;