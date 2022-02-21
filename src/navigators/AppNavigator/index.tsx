import React from 'react';

// Dependencies
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

// Types
import { AppNavigatorParams } from './types';

// Hooks
import { useStorageValue } from 'data/Storage';

// Navigators
import { HomeNavigator } from 'navigators/HomeNavigator';

// Screens
import { EpisodeScreen, PinScreen, SeasonScreen, ShowScreen } from 'screens';

const { Navigator, Screen } = createStackNavigator<AppNavigatorParams>();

export const AppNavigator = () => {
  const [pin] = useStorageValue('@pin');

  return (
    <Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}>
      {pin && <Screen name="PinScreen" component={PinScreen} />}
      <Screen name="HomeNavigator" component={HomeNavigator} />
      <Screen name="ShowScreen" component={ShowScreen} />
      <Screen name="SeasonScreen" component={SeasonScreen} />
      <Screen name="EpisodeScreen" component={EpisodeScreen} />
    </Navigator>
  );
};
