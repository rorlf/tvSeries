import React from 'react';

// Components
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

// Hooks
import { useTheme } from 'store/slices/themeSlice';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const Loading = ({ style }: Props) => {
  const { colors } = useTheme();

  return (
    <ActivityIndicator size="large" color={colors.textPrimary} style={style} />
  );
};
