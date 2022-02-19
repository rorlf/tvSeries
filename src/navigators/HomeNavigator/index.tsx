import React from 'react';

// Dependencies
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import { HomeScreen } from 'screens/HomeScreen';

// Hooks
import { useTheme } from 'store/slices/themeSlice';

// Types
import { HomeNavigatorParams } from './types';

// Styles
import useStyles from './styles';

const { Navigator, Screen } = createBottomTabNavigator<HomeNavigatorParams>();

export const HomeNavigator = () => {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarInactiveTintColor: colors.inactiveIcon,
      }}>
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="TesteScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Menu',

          tabBarIcon: ({ color, size }) => (
            <Icon name="menu" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
};
