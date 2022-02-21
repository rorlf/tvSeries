import { NavigatorScreenParams } from '@react-navigation/native';
import { HomeNavigatorParams } from 'navigators/HomeNavigator/types';
import { Episode, Person, Season, Show } from 'services/TvMazeService/types';

export type AppNavigatorParams = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorParams>;
  PinScreen: undefined;
  ShowScreen: Show;
  SeasonScreen: { season: Season; showName: string };
  EpisodeScreen: Episode;
  PersonScreen: Person;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppNavigatorParams {}
  }
}
