import React, { createContext, useState, useContext, useEffect } from 'react';

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [challenges, setChallenges] = useState([
    { id: 'tap10', text: 'Tap 10 times', target: 10, current: 0, completed: false },
    { id: 'double5', text: 'Perform 5 double-taps', target: 5, current: 0, completed: false },
    { id: 'hold3s', text: 'Hold for 3 seconds', target: 1, current: 0, completed: false },
    { id: 'drag', text: 'Drag the object', target: 1, current: 0, completed: false },
    { id: 'swipe', text: 'Swipe right and left', target: 2, current: 0, completed: false, swipeLeft: false, swipeRight: false },
    { id: 'pinch', text: 'Change size (Pinch)', target: 1, current: 0, completed: false },
    { id: 'score100', text: 'Reach 100 points', target: 100, current: 0, completed: false },
    { id: 'custom', text: 'Custom: Triple Tap (Experimental)', target: 1, current: 0, completed: false },
  ]);

  const updateScore = (points) => {
    setScore(prev => {
      const newScore = prev + points;
      updateChallenge('score100', newScore);
      return newScore;
    });
  };

  const updateChallenge = (id, progress = 1, absolute = false) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === id) {
        const newCurrent = absolute ? progress : ch.current + progress;
        const isCompleted = newCurrent >= ch.target;
        return { ...ch, current: newCurrent, completed: isCompleted };
      }
      if (id === 'swipe' && ch.id === 'swipe') {
          const newState = { ...ch };
          if (progress === 'left') newState.swipeLeft = true;
          if (progress === 'right') newState.swipeRight = true;
          if (newState.swipeLeft && newState.swipeRight) {
              newState.completed = true;
              newState.current = 2;
          } else if (newState.swipeLeft || newState.swipeRight) {
              newState.current = 1;
          }
          return newState;
      }
      return ch;
    }));
  };

  return (
    <ScoreContext.Provider value={{ score, challenges, updateScore, updateChallenge }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);