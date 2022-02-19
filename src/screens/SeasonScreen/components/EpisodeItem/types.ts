import { Episode } from 'services/TvMazeService/types';

export interface EpisodeItemProps extends Episode {
  title: string;
  description: string;
}
