import React from 'react';

// Components
import { TextInput, TextInputProps } from 'react-native';

// Styles
import useStyles from './styles';

const CustomTextInput = ({ style, ...textInputProps }: TextInputProps) => {
  const styles = useStyles();

  return <TextInput style={[styles.text, style]} {...textInputProps} />;
};

export { CustomTextInput as TextInput };
