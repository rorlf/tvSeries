import { ImageStyle, StyleProp } from 'react-native';

export interface PosterWithNameProps {
  id: string;
  uri?: string;
  name: string;
  isFavorite: boolean;
  onPress?: () => void;
  onPressFavorite?: () => void;
  style?: StyleProp<ImageStyle>;
}
