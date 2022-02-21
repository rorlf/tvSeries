import React from 'react';

// Components
import { TextInput } from 'react-native';

// Types
import { CustomTextInputProps } from './types';

// Styles
import useStyles from './styles';

const CustomTextInput = ({
  innerRef,
  style,
  ...textInputProps
}: CustomTextInputProps) => {
  const styles = useStyles();

  return (
    <TextInput
      ref={innerRef}
      style={[styles.text, style]}
      {...textInputProps}
    />
  );
};

export { CustomTextInput as TextInput };
