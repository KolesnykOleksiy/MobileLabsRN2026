# Gesture Clicker (Lab 3)

## Introduction
'Gesture Clicker' is a React Native mobile application designed to demonstrate the usage of `react-native-gesture-handler` for advanced user interactions.

## Functionality
- **Home Screen**:
  - A score counter that updates in real-time.
  - An interactive object responding to various gestures:
    - **Single Tap**: +1 point.
    - **Double Tap**: +5 points (Double point bonus).
    - **Long Press**: +20 points (Hold for bonus).
    - **Pan (Drag)**: Drag the object around the screen.
    - **Fling (Swipe)**: Swipe left or right for a random bonus (0-50 points).
    - **Pinch (Scale)**: Resize the object to get +10 points.
- **Challenges Screen**:
  - Tracks 8 different tasks including tap counts, holding duration, dragging, swiping, and reaching a score goal.
  - Visual feedback for completed tasks.
- **Settings Screen**:
  - Toggle between Light and Dark themes.
  - Displays application version.

## Technical Stack
- **React Native** (Expo)
- **React Navigation**: Bottom Tab Navigation.
- **React Native Gesture Handler**: `GestureDetector` API (v2).
- **Styled Components**: Theme-based styling.
- **React Context API**: State management for scores, challenges, and themes.

## Installation and Launch
1. Clone the repository and navigate to the `lab3` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npx expo start
   ```
4. Use the Expo Go app on your phone or an emulator to run the project.

## Screenshots
[Placeholder for Home Screen]
[Placeholder for Challenges Screen]
[Placeholder for Settings Screen]

## Conclusion
This lab project successfully implements complex touch interactions using `react-native-gesture-handler`. It demonstrates how to integrate multiple simultaneous and exclusive gestures on a single element while maintaining a clean state management approach using React Context.