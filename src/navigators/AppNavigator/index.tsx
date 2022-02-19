import React from 'react';

// Dependencies
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

// Types
import { AppNavigatorParams } from './types';

// Navigators
import { HomeNavigator } from 'navigators/HomeNavigator';
import { Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  );
};

const { Navigator, Screen } = createStackNavigator<AppNavigatorParams>();

export const AppNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}>
      <Screen name="HomeNavigator" component={HomeNavigator} />

      <Screen name="HomeScreen" component={HomeScreen} />
    </Navigator>
  );
};
