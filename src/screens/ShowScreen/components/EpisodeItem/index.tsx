import React from 'react';

// Components
import { TouchableOpacity } from 'react-native';
import { Body1 } from 'shared/components';

// Dependencies
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Types
import { Episode } from 'services/TvMazeService/types';

// Hooks
import { useTheme } from 'store/slices/themeSlice';

// Styles
import useStyles from './styles';

interface Props extends Episode {
  onPress: () => void;
}

export const EpisodeItem = ({ name, number, onPress }: Props) => {
  const styles = useStyles();
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Body1 style={styles.text} numberOfLines={1}>
        {number}. {name}{' '}
      </Body1>
      <Icon name="information" color={colors.placeholder} size={20} />
    </TouchableOpacity>
  );
};
