import React, { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { useTheme } from '../context/ThemeContext';
import { useScore } from '../context/ScoreContext';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  align-items: center;
  justify-content: center;
`;

const ScoreText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: ${props => props.theme.primary};
  position: absolute;
  top: 50px;
`;

const InteractiveObject = styled(Animated.View)`
  width: 150px;
  height: 150px;
  background-color: ${props => props.theme.secondary};
  border-radius: 75px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  align-items: center;
  justify-content: center;
`;

const ObjectText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 10px;
`;

const HomeScreen = () => {
  const { colors } = useTheme();
  const { score, updateScore, updateChallenge } = useScore();
  
  const translationX = useRef(new Animated.Value(0)).current;
  const translationY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const savedScale = useRef(1);

  const singleTap = Gesture.Tap()
    .runOnJS(true)
    .onEnd((_event, success) => {
      if (success) {
        updateScore(1);
        updateChallenge('tap10', 1);
      }
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .runOnJS(true)
    .onEnd((_event, success) => {
      if (success) {
        updateScore(5);
        updateChallenge('double5', 1);
      }
    });

  const longPress = Gesture.LongPress()
    .runOnJS(true)
    .onEnd((_event, success) => {
      if (success) {
        updateScore(20);
        updateChallenge('hold3s', 1);
      }
    });

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((event) => {
      translationX.setValue(event.translationX);
      translationY.setValue(event.translationY);
    })
    .onEnd(() => {
      updateChallenge('drag', 1);
      Animated.spring(translationX, { toValue: 0, useNativeDriver: true }).start();
      Animated.spring(translationY, { toValue: 0, useNativeDriver: true }).start();
    });

  const flingRight = Gesture.Fling()
    .direction(1)
    .runOnJS(true)
    .onEnd(() => {
      updateScore(Math.floor(Math.random() * 50));
      updateChallenge('swipe', 'right');
    });

  const flingLeft = Gesture.Fling()
    .direction(2)
    .runOnJS(true)
    .onEnd(() => {
      updateScore(Math.floor(Math.random() * 50));
      updateChallenge('swipe', 'left');
    });

  const pinch = Gesture.Pinch()
    .runOnJS(true)
    .onUpdate((event) => {
      scale.setValue(savedScale.current * event.scale);
    })
    .onEnd((event) => {
      savedScale.current = savedScale.current * event.scale;
      updateChallenge('pinch', 1);
      updateScore(10);
    });

  const composedGestures = Gesture.Exclusive(
    doubleTap, 
    singleTap,
    longPress,
    flingRight,
    flingLeft,
    Gesture.Simultaneous(pan, pinch)
  );

  return (
    <Container theme={colors}>
      <ScoreText theme={colors}>Score: {score}</ScoreText>
      <GestureDetector gesture={composedGestures}>
        <InteractiveObject 
          theme={colors}
          style={{
            transform: [
              { translateX: translationX },
              { translateY: translationY },
              { scale: scale },
            ]
          }}
        >
          <ObjectText>TAP / DRAG / PINCH / SWIPE</ObjectText>
        </InteractiveObject>
      </GestureDetector>
    </Container>
  );
};

export default HomeScreen;