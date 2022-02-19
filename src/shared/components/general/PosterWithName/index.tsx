import React from 'react';

// Dependencies
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import { Pressable, TouchableOpacity, View } from 'react-native';
import { Body2, ShowPoster } from 'shared/components';

// Types
import { PosterWithNameProps } from './types';

// Hooks
import { useTheme } from 'store/slices/themeSlice';

// Styles
import useStyles from './styles';

export const PosterWithName = ({
  onPress,
  uri,
  name,
  isFavorite,
  onPressFavorite,
  style,
}: PosterWithNameProps) => {
  const styles = useStyles();
  const { colors } = useTheme();

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <ShowPoster uri={uri} />
      <View style={styles.info}>
        <Body2 style={styles.name} numberOfLines={1}>
          {name}
        </Body2>
      </View>
      <TouchableOpacity
        style={styles.favoriteContainer}
        onPress={onPressFavorite}>
        <Icon
          name="star"
          color={isFavorite ? colors.favorite : colors.inactiveIcon}
          size={20}
        />
      </TouchableOpacity>
    </Pressable>
  );
};
