import { NavigatorScreenParams } from '@react-navigation/native';
import { HomeNavigatorParams } from 'navigators/HomeNavigator/types';
import { Show } from 'services/TvMazeService/types';

export type AppNavigatorParams = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorParams>;
  ShowScreen: Show;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppNavigatorParams {}
  }
}
