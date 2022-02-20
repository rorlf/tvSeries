import React, { useMemo } from 'react';

// Dependencies
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import { Pressable, TouchableOpacity, View } from 'react-native';
import { Body2, ShowPoster } from 'shared/components';

// Types
import { PosterWithNameProps } from './types';

// Hooks
import { useTheme } from 'store/slices/themeSlice';
import { useStorageValue } from 'data/Storage';

// Styles
import useStyles from './styles';

export const PosterWithName = ({
  id,
  onPress,
  uri,
  name,
  onPressFavorite,
  style,
}: PosterWithNameProps) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const [favorites] = useStorageValue('@favorites');
  const isFavorite = useMemo(
    () => !!favorites?.some(favorite => favorite.id === id),
    [favorites, id],
  );

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
          name="heart"
          color={isFavorite ? colors.favorite : colors.inactiveIcon}
          size={20}
        />
      </TouchableOpacity>
    </Pressable>
  );
};
