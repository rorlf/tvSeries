import React from 'react';

// Dependencies
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// Screens
import {
  FavoritesScreen,
  HomeScreen,
  MenuScreen,
  PeopleSearchScreen,
  SearchShowScreen,
} from 'screens';

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
        tabBarActiveTintColor: colors.favorite,
      }}>
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="SearchShowScreen"
        component={SearchShowScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name="search" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcon name="heart" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="PeopleSearchScreen"
        component={PeopleSearchScreen}
        options={{
          tabBarLabel: 'People',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name="person-search" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: 'Menu Options',
          headerStyle: {
            backgroundColor: colors.navigationBar,
            borderBottomWidth: 1,
          },
          headerTitleStyle: { color: colors.textPrimary },
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcon name="menu" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
};
