import { ImageStyle, StyleProp } from 'react-native';

export interface PosterWithNameProps {
  id: number;
  uri?: string;
  name: string;
  onPress?: () => void;
  onPressFavorite?: () => void;
  style?: StyleProp<ImageStyle>;
  hideFavoriteButton?: boolean;
}
