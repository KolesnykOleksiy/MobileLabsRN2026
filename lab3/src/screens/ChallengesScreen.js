import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '../context/ThemeContext';
import { useScore } from '../context/ScoreContext';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  padding: 20px;
`;

const ChallengeItem = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.card};
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: ${props => props.theme.border};
`;

const ChallengeTextContainer = styled.View`
  flex: 1;
  margin-left: 15px;
`;

const ChallengeTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.text};
`;

const ChallengeProgress = styled.Text`
  font-size: 14px;
  color: #8E8E93;
`;

const ChallengesScreen = () => {
  const { colors } = useTheme();
  const { challenges } = useScore();

  const renderItem = ({ item }) => (
    <ChallengeItem theme={colors}>
      <Ionicons 
        name={item.completed ? 'checkmark-circle' : 'ellipse-outline'} 
        size={24} 
        color={item.completed ? '#34C759' : '#8E8E93'} 
      />
      <ChallengeTextContainer>
        <ChallengeTitle theme={colors}>{item.text}</ChallengeTitle>
        <ChallengeProgress theme={colors}>{item.current >= item.target ? item.target : item.current} / {item.target}</ChallengeProgress>
      </ChallengeTextContainer>
    </ChallengeItem>
  );

  return (
    <Container theme={colors}>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default ChallengesScreen;