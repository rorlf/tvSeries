import React from 'react';

// Components
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Body2 } from 'shared/components';

// Hooks
import { useTheme } from 'store/slices/themeSlice';
import useStyles from './styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  message: string;
  onPressRetry: () => void;
}

export const Error = ({ message, onPressRetry, style }: Props) => {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View style={[styles.container, style]}>
      <Icon name="alert" size={60} color={colors.error} />
      <Body2>{message}</Body2>
      <TouchableOpacity style={styles.tryAgainContainer} onPress={onPressRetry}>
        <Body2>Try Again</Body2>
      </TouchableOpacity>
    </View>
  );
};
