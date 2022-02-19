import { Show } from 'services/TvMazeService/types';

export interface TvSeriesItemProps extends Show {
  onPressTvSerie: () => void;
  onPressFavorite: () => void;
}
