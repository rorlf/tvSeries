import React from 'react';

// Dependencies
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

// Hooks
import { useTheme } from 'store/slices/themeSlice';
import { useNavigation } from '@react-navigation/native';

// Utils
import { spacing } from 'shared/utils/styles';

export const BackButton = (props: TouchableOpacityProps) => {
  const { goBack } = useNavigation();
  const { onPress = goBack, ...touchableOpacityProps } = props;
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      {...touchableOpacityProps}
      hitSlop={{
        bottom: spacing(1),
        left: spacing(1),
        right: spacing(1),
        top: spacing(1),
      }}>
      <Icon
        name="arrow-left-circle-outline"
        color={colors.textPrimary}
        size={32}
      />
    </TouchableOpacity>
  );
};
