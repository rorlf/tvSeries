import React from 'react';

// Dependencies
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import { View, Image, TouchableOpacity, Pressable } from 'react-native';
import { Body1 } from 'shared/components';

// Types
import { TvSeriesItemProps } from './types';

// Styles
import useStyles from './styles';

export const ShowItem = ({
  name,
  image,
  onPressTvSerie,
  onPressFavorite,
}: TvSeriesItemProps) => {
  const styles = useStyles();

  return (
    <Pressable style={styles.container} onPress={onPressTvSerie}>
      <Image source={{ uri: image.medium }} style={styles.image} />
      <View style={styles.info}>
        <Body1 style={styles.name} numberOfLines={1}>
          {name}
        </Body1>
      </View>
      <TouchableOpacity
        style={styles.favoriteContainer}
        onPress={onPressFavorite}>
        <Icon name="star" color="#e0e0e0" size={18} />
      </TouchableOpacity>
    </Pressable>
  );
};
