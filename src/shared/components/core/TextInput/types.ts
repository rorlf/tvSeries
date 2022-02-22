import { RefObject } from 'react';
import { TextInput, TextInputProps } from 'react-native';

export interface CustomTextInputProps extends TextInputProps {
  innerRef: RefObject<TextInput>;
}
