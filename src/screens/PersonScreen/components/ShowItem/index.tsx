import React from 'react';

// Components
import { Pressable } from 'react-native';
import { Caption, Poster } from 'shared/components';

// Types
import { ShowItemItemProps } from './types';

// Styles
import useStyles from './styles';

export const ShowItem = ({ image, name, onPress }: ShowItemItemProps) => {
  const styles = useStyles();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Poster uri={image?.medium} />
      <Caption style={styles.caption}>{name}</Caption>
    </Pressable>
  );
};
