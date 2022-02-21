import React from 'react';

// Components
import { Image, ImageStyle, StyleProp, View } from 'react-native';
import { Body1 } from 'shared/components';

// Styles
import useStyles from './styles';

interface Props {
  uri?: string;
  style?: StyleProp<ImageStyle>;
}
export const Poster = ({ style, uri }: Props) => {
  const styles = useStyles();

  if (uri) return <Image style={[styles.image, style]} source={{ uri }} />;

  return (
    <View style={[styles.noImage, style]}>
      <Body1>No Image</Body1>
    </View>
  );
};
