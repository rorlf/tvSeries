import { Show } from 'services/TvMazeService/types';

export interface ShowItemProps extends Show {
  onPressTvSerie: () => void;
  onPressFavorite: () => void;
  isFavorite: boolean;
}
