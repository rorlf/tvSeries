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

// Screens
import { SeasonScreen, ShowScreen } from 'screens';

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
      <Screen name="ShowScreen" component={ShowScreen} />
      <Screen name="SeasonScreen" component={SeasonScreen} />
    </Navigator>
  );
};
