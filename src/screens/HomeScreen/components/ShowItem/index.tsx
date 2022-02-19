import React from 'react';

// Dependencies
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import { View, TouchableOpacity, Pressable } from 'react-native';
import { Body2, ShowPoster } from 'shared/components';

// Types
import { ShowItemProps } from './types';

// Hooks
import { useTheme } from 'store/slices/themeSlice';

// Styles
import useStyles from './styles';

export const ShowItem = ({
  name,
  image,
  onPressTvSerie,
  onPressFavorite,
  isFavorite,
}: ShowItemProps) => {
  const styles = useStyles();
  const { colors } = useTheme();

  return (
    <Pressable style={styles.container} onPress={onPressTvSerie}>
      <ShowPoster uri={image.medium} />
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
