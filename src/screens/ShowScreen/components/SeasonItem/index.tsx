import React from 'react';

// Components
import { Pressable } from 'react-native';
import { Caption, Poster } from 'shared/components';

// Types
import { SeasonItemProps } from './types';

// Styles
import useStyles from './styles';

export const SeasonItem = ({ image, number, onPress }: SeasonItemProps) => {
  const styles = useStyles();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Poster uri={image?.medium} />
      <Caption style={styles.caption}>Season {number} </Caption>
    </Pressable>
  );
};
