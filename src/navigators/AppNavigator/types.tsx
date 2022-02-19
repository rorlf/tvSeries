import { NavigatorScreenParams } from '@react-navigation/native';
import { HomeNavigatorParams } from 'navigators/HomeNavigator/types';

export type AppNavigatorParams = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorParams>;
  HomeScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppNavigatorParams {}
  }
}
