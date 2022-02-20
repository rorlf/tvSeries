import { NavigatorScreenParams } from '@react-navigation/native';
import { HomeNavigatorParams } from 'navigators/HomeNavigator/types';
import { Season, Show } from 'services/TvMazeService/types';

export type AppNavigatorParams = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorParams>;
  PinScreen: undefined;
  ShowScreen: Show;
  SeasonScreen: { season: Season; showName: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppNavigatorParams {}
  }
}
