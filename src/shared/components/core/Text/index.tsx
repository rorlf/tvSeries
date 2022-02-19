import React from 'react';

// Components
import { Text, TextProps } from 'react-native';

// Styles
import useStyles from './styles';

const CustomText = ({ children, style, ...textProps }: TextProps) => {
  const styles = useStyles();

  return (
    <Text style={[styles.text, style]} {...textProps}>
      {children}
    </Text>
  );
};

export { CustomText as Text };
