import React from 'react';

// Components
import { Switch, SwitchProps } from 'react-native';

// Hooks
import { useTheme } from 'store/slices/themeSlice';

const CustomSwitch = ({ ...switchProps }: SwitchProps) => {
  const { colors } = useTheme();

  return (
    <Switch
      thumbColor={switchProps.value ? colors.primary : colors.placeholder}
      trackColor={{
        false: colors.overlay,
        true: colors.placeholder,
      }}
      {...switchProps}
    />
  );
};

export { CustomSwitch as Switch };
