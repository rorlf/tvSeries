import { Season } from 'services/TvMazeService/types';

export interface SeasonItemProps extends Season {
  onPress: () => void;
}
