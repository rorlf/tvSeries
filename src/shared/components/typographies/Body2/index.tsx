import React from 'react';

// Components
import { Text } from 'shared/components/core/Text';

// Types
import { TextProps } from 'react-native';

// Styles
import useStyles from './styles';

export const Body2 = ({ children, style, ...textProps }: TextProps) => {
  const styles = useStyles();

  return (
    <Text style={[styles.text, style]} {...textProps}>
      {children}
    </Text>
  );
};
