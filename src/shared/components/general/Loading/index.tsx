import React from 'react';

// Components
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';

// Hooks
import { useTheme } from 'store/slices/themeSlice';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const Loading = ({ style }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={style}>
      <ActivityIndicator size="large" color={colors.textPrimary} />
    </View>
  );
};
